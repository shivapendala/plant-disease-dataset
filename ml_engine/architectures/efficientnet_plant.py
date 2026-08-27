"""EfficientNet-B4 Backbone with Depthwise Separable Convolutions."""
import torch
import torch.nn as nn

class Swish(nn.Module):
    def forward(self, x: torch.Tensor) -> torch.Tensor:
        return x * torch.sigmoid(x)

class MBConvBlock(nn.Module):
    def __init__(self, in_channels: int, out_channels: int, expand_ratio: int, stride: int, kernel_size: int = 3):
        super().__init__()
        self.stride = stride
        self.use_residual = (in_channels == out_channels) and (stride == 1)
        hidden_dim = in_channels * expand_ratio

        layers = []
        if expand_ratio != 1:
            layers.extend([
                nn.Conv2d(in_channels, hidden_dim, kernel_size=1, bias=False),
                nn.BatchNorm2d(hidden_dim),
                Swish()
            ])

        layers.extend([
            nn.Conv2d(hidden_dim, hidden_dim, kernel_size=kernel_size, stride=stride, padding=kernel_size // 2, groups=hidden_dim, bias=False),
            nn.BatchNorm2d(hidden_dim),
            Swish(),
            nn.Conv2d(hidden_dim, out_channels, kernel_size=1, bias=False),
            nn.BatchNorm2d(out_channels)
        ])
        self.conv = nn.Sequential(*layers)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        if self.use_residual:
            return x + self.conv(x)
        return self.conv(x)

class PlantEfficientNetB4(nn.Module):
    def __init__(self, num_classes: int = 38):
        super().__init__()
        self.stem = nn.Sequential(
            nn.Conv2d(3, 48, kernel_size=3, stride=2, padding=1, bias=False),
            nn.BatchNorm2d(48),
            Swish()
        )
        self.blocks = nn.Sequential(
            MBConvBlock(48, 24, expand_ratio=1, stride=1),
            MBConvBlock(24, 32, expand_ratio=6, stride=2),
            MBConvBlock(32, 56, expand_ratio=6, stride=2),
            MBConvBlock(56, 112, expand_ratio=6, stride=2),
            MBConvBlock(112, 160, expand_ratio=6, stride=1),
            MBConvBlock(160, 272, expand_ratio=6, stride=2),
            MBConvBlock(272, 448, expand_ratio=6, stride=1)
        )
        self.head = nn.Sequential(
            nn.Conv2d(448, 1792, kernel_size=1, bias=False),
            nn.BatchNorm2d(1792),
            Swish(),
            nn.AdaptiveAvgPool2d(1),
            nn.Dropout(0.3),
            nn.Flatten(),
            nn.Linear(1792, num_classes)
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        x = self.stem(x)
        x = self.blocks(x)
        x = self.head(x)
        return x

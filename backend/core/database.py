"""Database engine and session lifecycle configuration."""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy.pool import QueuePool
from backend.core.config import settings

# Engine configuration with connection pooling and timeouts
engine = create_engine(
    settings.DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://") if "postgresql://" in settings.DATABASE_URL else settings.DATABASE_URL,
    poolclass=QueuePool,
    pool_size=settings.DB_POOL_SIZE,
    max_overflow=settings.DB_MAX_OVERFLOW,
    pool_timeout=settings.DB_TIMEOUT,
    pool_recycle=1800,
    pool_pre_ping=True,
    echo=settings.DEBUG,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency for acquiring and releasing database sessions."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

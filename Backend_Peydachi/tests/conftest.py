# import pytest
# from fastapi.testclient import TestClient
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker

# from main import app 
# from dependencies.dependencies import get_db
# from database.database import Base

# SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  
# engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

# TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# def override_get_db():
#     db = TestingSessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# # Apply override
# app.dependency_overrides[get_db] = override_get_db


# @pytest.fixture(scope="session", autouse=True)
# def setup_test_db():
#     # Recreate database schema for each test session
#     Base.metadata.drop_all(bind=engine)
#     Base.metadata.create_all(bind=engine)
#     yield
#     Base.metadata.drop_all(bind=engine)


# @pytest.fixture()
# def client():
#     with TestClient(app) as client:
#         yield client










import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from main import app
from dependencies.dependencies import get_db
from database.database import Base

DATABASE_URL = "sqlite:///./test.db"  

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    Base.metadata.create_all(bind=engine)
    yield
    # Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture(autouse=True)
def override_get_db_fixture(db_session):
    def _get_db_override():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = _get_db_override


@pytest.fixture()
def client():
    with TestClient(app) as c:
        yield c


















# import pytest
# from fastapi.testclient import TestClient
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, Session
# from main import app
# from dependencies.dependencies import get_db
# from database.database import Base, engine, session_local


# # Use a persistent SQLite test database (you can change this to Postgres if needed)
# DATABASE_URL = "sqlite:///./test.db"  # Or use a real Postgres test DB if needed
# engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# # Override the app dependency to use a test database
# def override_get_db():
#     db = TestingSessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()


# # Apply the override to the FastAPI app
# app.dependency_overrides[get_db] = override_get_db


# # Create tables only once for the whole session
# @pytest.fixture(scope="session", autouse=True)
# def setup_test_db():
#     Base.metadata.create_all(bind=engine)  # Create tables
#     yield
#     # Don't drop tables, they persist across tests
#     pass


# @pytest.fixture(autouse=True)
# def transaction_scope():
#     db = TestingSessionLocal()
#     db.begin()
#     yield db
#     db.rollback()
#     db.close()


# @pytest.fixture()
# def client():
#     with TestClient(app) as client:
#         yield client

from pydantic import BaseModel
from pydantic.config import ConfigDict

class BaseSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        extra='ignore',
        validate_assignment=True
    )
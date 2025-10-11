from app.atlas import hello
def test_hello():
    assert "Atlas online" in hello("D")

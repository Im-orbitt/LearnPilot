from services.auth import hash_password, verify_password


def test_password_hash_is_not_plaintext():
    password = "test-password-123"

    hashed = hash_password(password)

    assert hashed != password
    assert hashed


def test_password_verification_succeeds():
    password = "test-password-123"

    hashed = hash_password(password)

    assert verify_password(password, hashed)


def test_password_verification_rejects_wrong_password():
    password = "test-password-123"

    hashed = hash_password(password)

    assert not verify_password("wrong-password", hashed)
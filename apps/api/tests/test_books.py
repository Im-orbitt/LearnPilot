from unittest.mock import patch
from services.books import count_user_books

def test_count_user_books_returns_zero_when_user_has_no_books():
    with patch(
        "services.books.supabase.table"
    ) as mock_table:
        mock_table.return_value.select.return_value.eq.return_value.execute.return_value.data = []

        result = count_user_books("test-user-id")

    assert result == 0
    
def test_count_user_books_counts_existing_books():
    with patch(
        "services.books.supabase.table"
    ) as mock_table:
        mock_table.return_value.select.return_value.eq.return_value.execute.return_value.data = [
            {"id": "book-1"},
            {"id": "book-2"},
        ]

        result = count_user_books("test-user-id")

    assert result == 2
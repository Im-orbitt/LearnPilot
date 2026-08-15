import fitz


def extract_text(
    pdf_file: bytes,
) -> str:
    document = fitz.open(
        stream=pdf_file,
        filetype="pdf",
    )

    try:
        text = ""

        for page in document:
            text += page.get_text()

        return text

    finally:
        document.close()
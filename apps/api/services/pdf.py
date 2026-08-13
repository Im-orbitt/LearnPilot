import fitz

def extract_text(pdf_file):
    document = fitz.open(stream=pdf_file, filetype="pdf")
    
    text = ""
    
    for page in document:
        text += page.get_text()
        
    document.close()
    return text

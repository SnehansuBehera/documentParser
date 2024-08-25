import pdfplumber
import spacy
import json

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")


def extract_text_from_pdf(file_path):
    """Extract text from the PDF file."""
    with pdfplumber.open(file_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text() or ""
    return text


def analyze_text(text):
    """Analyze text to identify clauses, obligations, rights, and potential risks."""
    doc = nlp(text)

    # Initialize dictionaries to store categorized text
    clauses = []
    obligations = []
    rights = []
    potential_risks = []

    # Sample keyword-based categorization (This can be enhanced with more advanced techniques)
    clause_keywords = ["clause", "provision", "section"]
    obligation_keywords = ["shall", "must", "obligated"]
    rights_keywords = ["right", "entitled", "may"]
    risk_keywords = ["risk", "liability", "exposure", "potential harm"]

    # Iterate over sentences and categorize based on keywords
    for sent in doc.sents:
        sent_text = sent.text.strip()
        if any(keyword in sent_text.lower() for keyword in clause_keywords):
            clauses.append(sent_text)
        elif any(keyword in sent_text.lower() for keyword in obligation_keywords):
            obligations.append(sent_text)
        elif any(keyword in sent_text.lower() for keyword in rights_keywords):
            rights.append(sent_text)
        elif any(keyword in sent_text.lower() for keyword in risk_keywords):
            potential_risks.append(sent_text)

    # Return a dictionary containing categorized text
    return {
        "clauses": clauses,
        "obligations": obligations,
        "rights": rights,
        "potential_risks": potential_risks,
    }


def process_document(file_path):
    """Process the PDF document and return categorized text as JSON."""
    text = extract_text_from_pdf(file_path)
    categorized_data = analyze_text(text)
    return categorized_data


if __name__ == "__main__":
    import sys

    file_path = sys.argv[1]
    categorized_data = process_document(file_path)
    print(json.dumps(categorized_data, indent=4))

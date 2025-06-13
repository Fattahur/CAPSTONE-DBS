from flask import Flask, request, jsonify
import nltk
import string
import heapq
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords

nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)

def summarize_text(text, num_sentences=2):
    sentences = sent_tokenize(text)
    words = word_tokenize(text.lower())
    stop_words = set(stopwords.words('indonesian'))

    word_frequencies = {}
    for word in words:
        if word not in stop_words and word not in string.punctuation:
            word_frequencies[word] = word_frequencies.get(word, 0) + 1

    sentence_scores = {}
    for sent in sentences:
        for word in word_tokenize(sent.lower()):
            if word in word_frequencies:
                sentence_scores[sent] = sentence_scores.get(sent, 0) + word_frequencies[word]

    summary_sentences = heapq.nlargest(num_sentences, sentence_scores, key=sentence_scores.get)
    return ' '.join(summary_sentences)

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Text is required"}), 400
    
    summary = summarize_text(text)
    return jsonify({"summary": summary})

if __name__ == '__main__':
    app.run(debug=True)

import requests
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import pandas as pd

# Memuat NLTK
nltk.download('punkt')
nltk.download('stopwords')

# Fungsi untuk scraping cerita
def scrape_ugm_article(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    # Mengambil bagian cerita dari artikel
    content = soup.find('div', {'class': 'post-content'})
    paragraphs = content.find_all('p')
    
    # Menggabungkan semua paragraf menjadi satu teks
    story = " ".join([para.get_text() for para in paragraphs])
    return story

# Fungsi untuk preprocessing teks (tokenisasi, stopword removal)
def preprocess_text(text):
    tokens = word_tokenize(text.lower())
    stop_words = set(stopwords.words('indonesian'))
    tokens = [word for word in tokens if word.isalnum() and word not in stop_words]
    return " ".join(tokens)

# Fungsi untuk menganalisis sentimen
def predict_sentiment(text, model, vectorizer):
    # Preprocess teks
    processed_text = preprocess_text(text)
    
    # Transformasi teks ke vektor fitur
    text_vector = vectorizer.transform([processed_text])
    
    # Prediksi sentimen
    prediction = model.predict(text_vector)
    return "Positif" if prediction == 1 else "Negatif"

# URL artikel yang akan diambil
url = 'https://ugm.ac.id/id/berita/cerita-mahasiswa-ugm-mengenal-budaya-ternate-lewat-modul-nusantara/'

# Scraping cerita dari artikel
story = scrape_ugm_article(url)
print(f"Cerita yang diambil:\n{story[:500]}...")  # Menampilkan 500 karakter pertama

# Dummy data pelatihan (misalnya cerita positif dan negatif)
train_data = [
    ("Saya sangat senang belajar tentang budaya Ternate!", 1),  # Positif
    ("Budaya ini sangat membingungkan dan sulit dipahami.", 0)  # Negatif
]

# Memisahkan teks dan label
train_texts, train_labels = zip(*train_data)

# Vectorizer untuk mengubah teks menjadi fitur numerik
vectorizer = TfidfVectorizer()
X_train = vectorizer.fit_transform(train_texts)
y_train = train_labels

# Melatih model Naive Bayes
model = MultinomialNB()
model.fit(X_train, y_train)

# Prediksi sentimen pada cerita yang diambil
sentiment = predict_sentiment(story, model, vectorizer)
print(f"Sentimen cerita: {sentiment}")

# Menyimpan hasil scraping dan sentimen ke CSV
stories = [
    {
        "text": story,           # variabel story dari proses scraping
        "sentiment": sentiment   # hasil prediksi dari fungsi predict_sentiment
    }
]

# Membuat DataFrame
df = pd.DataFrame(stories)

# Simpan ke CSV
df.to_csv("sentiment_results.csv", index=False)

print("Hasil disimpan dalam sentiment_results.csv")

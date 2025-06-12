
const ModelApiService = {
  async predictSentiment(text) {
    const response = await fetch('https://modelml-production.up.railway.app/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gagal memuat data: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result;
  },
};

export default ModelApiService;

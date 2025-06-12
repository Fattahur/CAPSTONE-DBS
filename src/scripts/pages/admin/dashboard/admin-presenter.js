import { BASE_URL } from '../../../api/api.js';

const AdminPresenter = {
  async getTotalCerita() {
    try {
      const response = await fetch(`${BASE_URL}/jumlah-cerita`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return data.total_cerita || 0;
      } else {
        console.error('Respon bukan JSON:', contentType);
        return 0;
      }
    } catch (error) {
      console.error('Gagal fetch total cerita:', error);
      return 0;
    }
  },

  async getTotalWaitingList() {
    try {
      const response = await fetch(`${BASE_URL}/waiting-list`, {
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Network response not ok');
      const result = await response.json();
      return result.data?.length || 0; // total data waiting list
    } catch (error) {
      console.error('Gagal fetch waiting list:', error);
      return 0;
    }
  },

  async getWeeklyCeritaData() {
  try {
    const response = await fetch(`${BASE_URL}/jumlah-cerita`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Network response not ok');
    const data = await response.json();
    return data.tanggal_cerita || [];
  } catch (error) {
    console.error('Gagal fetch data cerita mingguan:', error);
    return [];
  }
},

async getAllStories() {
  try {
    const response = await fetch(`${BASE_URL}/semua-cerita`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) throw new Error('Network response not ok');
    const result = await response.json();

    // result.data adalah array cerita
    return result.data || [];
  } catch (error) {
    console.error('Gagal fetch semua cerita:', error);
    return [];
  }
},


};

export default AdminPresenter;








// import { BASE_URL } from "../../../api/api.js";

// const AdminPresenter = {
//   async getTotalCerita() {
//     try {
//       const response = await fetch(`${BASE_URL}/jumlah-cerita`, {
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Network response not ok");

//       const data = await response.json();
//       console.log("Respon dari jumlah-cerita:", data);

//       // Gunakan key total_cerita sesuai response
//       return data.total_cerita ?? 0;

//     } catch (error) {
//       console.error("Gagal fetch total cerita:", error);
//       return 0;
//     }
//   },

//   async getTotalWaitingList() {
//     try {
//       const response = await fetch(`${BASE_URL}/waiting-list`, {
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Network response not ok");
//       const result = await response.json();
//       return result.data?.length || 0;
//     } catch (error) {
//       console.error("Gagal fetch waiting list:", error);
//       return 0;
//     }
//   },

//   async getWeeklyCeritaData() {
//     try {
//       const response = await fetch(`${BASE_URL}/jumlah-cerita`, {
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Network response not ok");
//       const data = await response.json();
//       return data.tanggal_cerita || [];
//     } catch (error) {
//       console.error("Gagal fetch data cerita mingguan:", error);
//       return [];
//     }
//   },

//   async getAllStories() {
//     try {
//       const response = await fetch(`${BASE_URL}/semua-cerita`, {
//         headers: {
//           Accept: "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Network response not ok");
//       const result = await response.json();
//       return result.data || [];
//     } catch (error) {
//       console.error("Gagal fetch semua cerita:", error);
//       return [];
//     }
//   },
// };

// export default AdminPresenter;

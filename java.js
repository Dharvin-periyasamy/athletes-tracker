// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoQkq4R6Cv03AjAuYALmvAED4jHG_8a2E",
    authDomain: "athletes-tracker-2c781.firebaseapp.com",
    projectId: "athletes-tracker-2c781",
    storageBucket: "athletes-tracker-2c781.appspot.com",
    messagingSenderId: "856681578454",
    appId: "1:856681578454:web:aa3eb06f56d304a55e6e77",
    measurementId: "G-NGH84N11JV"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Handle user login
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Logged in as:", userCredential.user.email);
            document.getElementById('authContainer').style.display = 'none'; // Hide login form
            document.getElementById('performanceData').style.display = 'block'; // Show performance data
            fetchData(); // Fetch performance data after login
        })
        .catch((error) => {
            document.getElementById('errorMessage').textContent = error.message; // Show error message
        });
});

// Fetch data from Google Sheets
const sheetId = '12hPCvShwBjzt_tij97Ud6MlGlFAGxkfUqbP3d3tfI1I'; // Your Google Sheet ID
const apiKey = 'AIzaSyAPxdegnLfpaK4-eJjv3Z0r97-w_xOJ0bE'; // Your API key

async function fetchData() {
    const loadingMessage = document.getElementById('loadingMessage');
    loadingMessage.style.display = 'block'; // Show loading message

    try {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/DATABASE?key=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.values && data.values.length > 0) {
            const rows = data.values;
            const tableBody = document.querySelector('#dataTable tbody');

            tableBody.innerHTML = ''; // Clear existing data

            let minElapsedTime = Infinity; // Initialize to a large number
            const formattedRows = [];

            // Loop through the rows to find the minimum elapsed time
            rows.slice(1).forEach(row => {
                const elapsedTimeMs = parseInt(row[2], 10); // Get elapsed time in milliseconds
                const formattedTime = (elapsedTimeMs / 1000).toFixed(3); // Convert to seconds and format

                // Keep track of the fastest time
                if (elapsedTimeMs < minElapsedTime) {
                    minElapsedTime = elapsedTimeMs;
                }

                formattedRows.push({ row, formattedTime });
            });

            // Populate the table and highlight the fastest time
            formattedRows.forEach(({ row, formattedTime }) => {
                const tr = document.createElement('tr');

                row.forEach((cell, index) => {
                    const td = document.createElement('td');
                    td.textContent = index === 2 ? formattedTime : cell; // Use formatted time for the elapsed time cell
                    tr.appendChild(td);
                });

                // Check if this row has the fastest time
                if (parseInt(row[2], 10) === minElapsedTime) {
                    tr.classList.add('best-time'); // Highlight the fastest time
                }

                tr.classList.add('table-row', 'fade-in'); // Add classes for animations
                tableBody.appendChild(tr);
            });
        } else {
            console.error('No data found.');
        }
    } catch (error) {
        console.error('Fetch error: ', error);
        document.getElementById('errorMessage').textContent = "Error fetching data. Please try again.";
    } finally {
        loadingMessage.style.display = 'none'; // Hide loading message
    }
}

// Monitor authentication state
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('User is signed in:', user);
        fetchData(); // Fetch data when the user is logged in
    } else {
        console.log('No user is signed in.');
    }
});

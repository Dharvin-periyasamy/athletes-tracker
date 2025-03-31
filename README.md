<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Athlete Performance Tracker</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
    <script type="module" src="java.js" defer></script>
</head>
<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">Performance Tracker</a>
    </nav>
    
    <div class="hero">
        <h1>Track Your Performance</h1>
        <p>Push your boundaries; the best is yet to come</p>
    </div>

    <div class="container mt-5">
        <h2 class="text-center mb-4">Login</h2>
        <div id="authContainer" class="border p-4 rounded bg-light shadow">
            <form id="loginForm">
                <div class="form-group">
                    <input type="email" class="form-control mb-3" id="email" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control mb-3" id="password" placeholder="Password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Login</button>
                <div id="errorMessage" class="mt-3" style="color:red;"></div>
            </form>
        </div>

        <div id="performanceData" class="mt-4" style="display:none;">
            <h2>Your Performance Data</h2>
            <div id="loadingMessage" class="alert alert-info" style="display: none;">Loading data...</div>
            <table id="dataTable" class="table table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Elapsed Time (s)</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Data will be populated here -->
                </tbody>
            </table>
        </div>
    </div>

    <div class="footer mt-5">
        <p>&copy; 2025 Athlete Performance Tracker. All rights reserved.</p>
    </div>
</body>
</html># athletes-tracker

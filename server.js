// ===== Dependencies ==== //
const express = require('express');
const app = express();
const PORT = 3000;

//  ==== Web Server ===== //
app.listen(PORT, () => {
    console.log('Express is listening on port ${PORT}')
});
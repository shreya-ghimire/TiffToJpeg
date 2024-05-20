document.getElementById('fileInput').addEventListener('change', function() {
    const fileInfo = document.getElementById('fileInfo');
    const fileInput = this.files[0];

    if (fileInput) {
        fileInfo.style.display = 'block';
        fileInfo.textContent = `Selected file: ${fileInput.name} (${formatFileSize(fileInput.size)})`;
    } else {
        fileInfo.style.display = 'none';
    }
});

document.getElementById('convertBtn').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const outputImg = document.getElementById('outputImg');
    const downloadLink = document.getElementById('downloadLink');
    const resetBtn = document.getElementById('resetBtn');

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // Check if the file is a TIFF image
        if (file.type === 'image/tiff' || file.name.toLowerCase().endsWith('.tif') || file.name.toLowerCase().endsWith('.tiff')) {
            const reader = new FileReader();

            reader.onload = function(e) {
                const tiff = new Tiff({buffer: e.target.result});
                const canvas = tiff.toCanvas();
                
                // Convert canvas to JPEG
                const jpegUrl = canvas.toDataURL('image/jpeg');

                outputImg.src = jpegUrl;
                outputImg.style.display = 'block';

                downloadLink.href = jpegUrl;
                downloadLink.style.display = 'inline-block';

                resetBtn.style.display = 'inline-block';
            }

            reader.readAsArrayBuffer(file);
        } else {
            alert('Please select a TIFF image file.');
        }
    } else {
        alert('Please select a file.');
    }
});
document.getElementById('resetBtn').addEventListener('click', function() {
        document.getElementById('fileInput').value = '';
        document.getElementById('fileInfo').style.display = 'none';
        document.getElementById('outputImg').src = '#';
        document.getElementById('outputImg').style.display = 'none';
        document.getElementById('downloadLink').style.display = 'none';
        document.getElementById('resetBtn').style.display = 'none';
    });
function formatFileSize(size) {
    if (size === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

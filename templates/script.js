function handleDrop(event) {
    event.preventDefault();
    var file = event.dataTransfer.files[0];
    handleFile(file);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleFile(file) {
    if (file && file.type.match('image.*')) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var imgData = e.target.result;
            var img = document.createElement('img');
            img.src = imgData;
            img.style.maxWidth = '100%';
            img.style.height = 'auto';

            var preview = document.getElementById('preview');
            preview.innerHTML = '';
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
}

function convertToPDF() {
    var preview = document.getElementById('preview');
    if (!preview.firstChild) {
        alert('Please select an image file.');
        return;
    }
    var imgData = preview.firstChild.src;

    var doc = new jsPDF();
    doc.addImage(imgData, 'JPEG', 10, 10, 190, 150);
    doc.save('converted.pdf');
}

document.getElementById('dropArea').addEventListener('drop', handleDrop);
document.getElementById('dropArea').addEventListener('dragover', handleDragOver);
document.getElementById('image').addEventListener('change', function() {
    handleFile(this.files[0]);
});

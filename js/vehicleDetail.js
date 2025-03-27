function openModal(imageUrl) {
    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const caption = document.getElementById("caption");
  
    modal.style.display = "block";
    modalImage.src = imageUrl;
    caption.innerHTML = "Click to close";
  }
  
  function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none";
  }
  
$(function() {
    $("#nav-menu").load("nav_menu.html");
 });

const fractal = document.querySelector('.fractals');
fractal.addEventListener('click', function() {

    fractal.classList.toggle('active');
    window.location.href = "fractals.html";
});

const colors = document.querySelector('.color-schemes');
colors.addEventListener('click', function() {

    colors.classList.toggle('active');
    window.location.href = "color_schemes.html";
});

const affine = document.querySelector('.moving-images');
affine.addEventListener('click', function() {

    affine.classList.toggle('active');
    window.location.href = "moving_images.html";
});




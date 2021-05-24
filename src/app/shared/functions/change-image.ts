export function ChangeImage(domId, files) {
  let fileReader = new FileReader();
  fileReader.onload = () => {
    let image = document.getElementById(domId);
    image.setAttribute('src', fileReader.result as string);
  }
  fileReader.readAsDataURL(files);
}

function typeWriter (txtElement,words,wait = '3000'){
   this.txtElement = txtElement;
   this.words = words;
   this.txt = '';
   this.wordIndex = 0;
   this.wait = parseInt(wait,10);
   this.type();
   this.isDeleting = false;
}

typeWriter.prototype.type = function(){
  const currentIndex = this.wordIndex % this.words.length;
  const fullTxt = this.words[currentIndex];
  if(this.isDeleting){
    // remove a char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  }else{
    // add a char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  // insert word in span 
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  // type speed
  let typeSpeed = 300;
  if(this.isDeleting){
    typeSpeed /= 2;
  }

  if(!this.isDeleting && this.txt === fullTxt){
     typeSpeed = this.wait;
     this.isDeleting = true;
  }else if(this.isDeleting && this.txt === ''){
     this.isDeleting = false;
     this.wordIndex++;
     typeSpeed = 500;
  }
  setTimeout( ()=> this.type(),typeSpeed );
}

document.addEventListener('DOMContentLoaded',init);
function init(){
   const txtElement = document.querySelector('.text-type');
   const words = JSON.parse(txtElement.getAttribute('data-words'));
   const wait = txtElement.getAttribute('data-wait');

   new typeWriter(txtElement,words,wait);
}

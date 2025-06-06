const target = document.getElementById('codeBlock');
let code = "";
let i = 0;

const files = [
    './game/clickManager.js',
    './game/UIBuilder.js',
    './style.css',
    './index.html'
    // add more in future
];
  
  async function fetchFileWithHeader(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to fetch ${path}`);
    const text = await response.text();
    return `// ======= ${path} =======\n${text}\n\n`;
}
  
  Promise.all(files.map(fetchFileWithHeader))
  .then(contents => {
    code = contents.join('');
    typeNextCharacter();
  })
  .catch(err => {
    target.innerText = "Error loading files.";
    console.error(err);
  });

  export function typeNextCharacter() {
    if (i < code.length) {
      const char = code[i++];
      const cursor = document.querySelector('.cursor');
  
      if (char === "\n") {
        const br = document.createElement("br");
        target.insertBefore(br, cursor);
      } else {
        const charSpan = document.createElement("span");
        charSpan.classList.add("char");
  
        if (char === " ") {
          charSpan.innerHTML = "&nbsp;";
        } else {
          charSpan.textContent = char;
        }
  
        target.insertBefore(charSpan, cursor);
        requestAnimationFrame(() => charSpan.classList.add("visible"));
        }
        
        target.scrollTop = target.scrollHeight;
   
    }
    else {
        i = 0;
        typeNextCharacter();
    }
  }
  
  export function deleteCharacters(count) {
    const nodes = Array.from(target.childNodes)
    .filter(node => node.classList?.contains('char') || node.nodeName === 'BR');

  for (let j = nodes.length - 1; j >= 0 && count > 0; j--) {
    const node = nodes[j];

    // Animate removal if it's a character
    if (node.classList?.contains('char')) {
      node.classList.add("remove");
      setTimeout(() => {
        if (node.parentNode) node.remove();
      }, 200);
    } else if (node.nodeName === 'BR') {
      // Remove <br> directly
      node.remove();
    }

    count--;
    i = Math.max(0, i - 1);
  }
  
   
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      target.appendChild(cursor); // re-appending moves it to end
    }
  }
  

  
  // Ensure cursor is always present
  if (!document.querySelector('.cursor')) {
    const cursor = document.createElement("span");
    cursor.classList.add("cursor");
    target.appendChild(cursor);
  }



    

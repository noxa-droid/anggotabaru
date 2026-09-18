const container = document.getElementById('rosterContainer');
const countEl = document.getElementById('memberCount');

function groupByLetter(members){
  const groups = {};
  members.forEach(m => {
    const letter = m.name.trim()[0].toUpperCase();
    if(!groups[letter]) groups[letter] = [];
    groups[letter].push(m);
  });
  return groups;
}

function render(members){
  members.sort((a,b) => a.name.localeCompare(b.name, 'id'));
  countEl.textContent = members.length;
  const groups = groupByLetter(members);
  const letters = Object.keys(groups).sort((a,b)=>a.localeCompare(b,'id'));

  letters.forEach(letter => {
    const row = document.createElement('div');
    row.className = 'letter-row';
    row.innerHTML = `<span class="letter-badge">${letter}</span><span class="line"></span>`;
    container.appendChild(row);

    const grid = document.createElement('div');
    grid.className = 'grid';
    groups[letter].forEach(m => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div class="frame">
          <span class="corner tl"></span>
          <span class="corner br"></span>
          <img class="photo" src="${m.img}" alt="${m.name}" loading="lazy">
        </div>
        <div class="name-plate">
          <div class="name">${m.name}</div>
        </div>
      `;
      grid.appendChild(card);
    });
    container.appendChild(grid);
  });
}

render(MEMBERS);

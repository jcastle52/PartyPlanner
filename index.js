const API =
  "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2505-ftb-ct-web-pt/events";

let planEvents = [];
let selectedEvent;

const GetParties = async () => {
  try {
    const response = await fetch(API);
    const data = await response.json();
    planEvents = data.data;
  } catch (error) {
    console.error(error);
  }

  Render();
};

const GetParty = async (id) => {
  try {
    const response = await fetch(`${API}/${id}`);
    const data = await response.json();
    selectedEvent = data.data;
  } catch (error) {
    console.error(error);
  }

  Render();
};

const CreatePartyItem = (party) => {
  $party = document.createElement("li");
  $party.innerHTML = `
  <a href="#selected">${party.name}</a>
  `;

  $a = $party.querySelector("a");
  $a.addEventListener("click", function () {
    GetParty(party.id);
  });

  return $party;
};

const PartyList = () => {
  $list = document.createElement("ul");
  $list.className = "lineup";

  for (let party of planEvents) {
    $list.append(CreatePartyItem(party));
  }
  return $list;
};

const PartyDetails = () => {
  if (!selectedEvent) {
    const $p = document.createElement("p");
    $p.textContent = "Please select an event to learn more.";
    return $p;
  } else {
    $section = document.createElement("section");
    $section.className = "party";
    $section.innerHTML = `
    <h3>${selectedEvent.name} #${selectedEvent.id}</h3>
    <p>${(selectedEvent.date).slice(0, 10)}</p>
    <p>${selectedEvent.location}</p>
    <p>${selectedEvent.description}</p>
    `;
    return $section;
  }
};

const Render = () => {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
      <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
      </section>
      <section id="selected">
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
      </section>
    </main>
    `;

  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("PartyDetails").replaceWith(PartyDetails());
};

const init = async () => {
  await GetParties();
  Render();
};

init();

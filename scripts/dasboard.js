// full page
let currentStatus = "all-btn";
window.addEventListener("load", () => {
  const spinner = document.getElementById("spinner-container");
  const content = document.querySelectorAll(".spin");
  setTimeout(() => {
    spinner.classList.add("hidden");
    content.forEach((el) => {
      el.classList.remove("invisible");
    });
  }, 100);

  allIssue();
});

// all issues
const allIssue = async () => {
  document.getElementById("card-container").innerHTML =
    `<div class="col-span-full mx-auto"><span class="loading loading-spinner loading-xl"></span></div>`;

  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  try {
    const res = await fetch(url);
    const issue = await res.json();
    const allData = issue.data;

    allIssueDisplay(allData);
  } catch (error) {
    document.getElementById("card-container").innerHTML =
      "<p class='text-red-500 text-3xl flex justify-center items-center col-span-full'>Failed to Load Card</p>";
  }
};

// single level
const singleIssue = async (id) => {
  const modal = document.getElementById("display_modal");
  modal.showModal();

  const modalContent = modal.querySelector(".modal-box");
  modal.innerHTML = `
    <div class="modal-box">
      <div class="flex justify-center p-10">
        <span class="loading loading-spinner loading-xl"></span>
      </div>
    </div>
  `;
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const singleData = data.data;

    modalDisplay(singleData);
  } catch (error) {
    const modal = document.getElementById("display_modal");
    modal.innerHTML = `
      <div class="modal-box">
        <p class='text-red-500 text-center p-10'>Failed to Load Modal</p>
        <form method="dialog" class="flex justify-end">
          <button class="btn btn-primary">Close</button>
        </form>
      </div>
    `;
  }
};

// card
const modalDisplay = (issue) => {
  const modalContainer = document.getElementById("display_modal");
  console.log(issue);
  const modalHTML = `
   <div class="modal-box">
        <div class="modal-action">
          <div class="w-fit rounded-xl">
            <div class="">
              <h1 class="text-2xl font-bold text-[#1F2937] mb-2">
                Opened ${issue.title}
              </h1>
              <div class="flex gap-5 mb-6">
                <p
                  class="bg-[#00A96E] px-3 py-1 text-white text-[14px] rounded-full mr-2"
                >
                   ${issue.status === "open" ? "Open" : "Closed"}
                </p>
                <ul class="flex gap-5 items-center">
                  <li class="list-disc mr-2 text-[12px] text-[#64748B]">
                    Opened by ${issue.assignee}
                  </li>
                  <li class="list-disc text-[12px] text-[#64748B]">
                    ${new Date(issue.createdAt).toLocaleDateString()}
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex gap-1">
              <div class="flex mb-3">
                ${generateLabels(issue.labels)}
              </div>
             
            </div>
            <div class="mb-6">
              <p class="text-[14px] mb-3 text-[#64748B]">
                ${issue.description}
              </p>
            </div>
            <div class="flex justify-between p-4 mb-6">
              <div class="">
                <p>Assignee</p>
                <h1>${issue.assignee}</h1>
              </div>
              <div class="">
                <p>Priority</p>
                <div>
                ${priorityBgChange(issue.priority)}
                </div>
              </div>
            </div>
            <form method="dialog" class="flex justify-end">
              <button class="btn btn-primary focus:outline-none">Close</button>
            </form>
          </div>
        </div>
      </div>
   
   `;
  modalContainer.innerHTML = modalHTML;
};

// display level
const generateLabels = (labels) => {
  if (!labels || labels.length === 0) return "";
  return labels
    .map((label) => {
      if (label === "bug") {
        return `<p class="text-[#EF4444] text-[12px] font-medium mr-2 rounded-full px-2 border-2 bg-[#FEECEC] border-[#FECACA]"><i class="fa-solid fa-bug"></i> BUG</p>`;
      } else if (label === "help wanted") {
        return `<div class="border-2 border-[#FDE68A] rounded-full px-2 bg-[#FFF8DB] text-[#D97706] font-medium text-[12px]">HELP WANTED</div>`;
      } else if (label === "enhancement") {
        return `<div class="border-2 border-[#86EFAC] rounded-full mr-2 p-1 text-[#00A96E] bg-[#DEFCE8] font-medium text-[10px]">ENHANCEMENT</div>`;
      } else if (label === "documentation") {
        return `<div class="border-2 border-[#93C5FD] rounded-full mr-2 px-2 font-medium text-[#64748B] text-[12px]">DOCS</div>`;
      } else if (label === "good first issue") {
        return `<div class="border-2 border-[#93C5FD] rounded-full px-2 font-medium bg-[#FEECEC] text-zinc-500 text-[12px]">Good First Issue</div>`;
      } else {
        return `<div class="border-2 border-gray-300 rounded-full p-1 font-medium text-[12px]">${label.toUpperCase()}</div>`;
      }
    })
    .join("");
};
const priorityBgChange = (priority) => {
  if (priority === "medium") {
    return `<h1 class="text-[12px] w-16 bg-[#FFF6D1] text-[#F59E0B] text-center font-medium rounded-full">Medium</h1>`;
  } else if (priority === "low") {
    return `<h1 class="text-[12px] w-16 bg-[#EEEFF2] text-[#9CA3AF] text-center font-medium rounded-full">Low</h1>`;
  } else if (priority === "high") {
    return `<h1 class="text-[12px] w-16 bg-[#FEECEC] text-[#EF4444] text-center font-medium rounded-full">High</h1>`;
  }
};

// all display issues
const allIssueDisplay = (issue) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  document.getElementById("all-issue").innerText = issue.length;
  document.getElementById("open-count").innerText = issue.filter(
    (i) => i.status === "open",
  ).length;
  document.getElementById("closed-count").innerText = issue.filter(
    (i) => i.status === "closed",
  ).length;
  issue.forEach((cardDetails) => {
    const card = document.createElement("div");

    // show modal on display
    if (cardDetails.status === "open") {
      card.className =
        "hover:scale-102 hover:-translate-y-2 transition-all duration-400 cursor-pointer rounded-t-lg border-t-4 border-[#00A96E]";
    } else if (cardDetails.status === "closed") {
      card.className =
        "hover:scale-102 hover:-translate-y-2 transition-all duration-400 cursor-pointer rounded-t-lg border-t-4 border-[#A855F7]";
    }

    const openClosedIcon = () => {
      if (cardDetails.status === "open") {
        return `<img src="./assets/Open-Status.png" alt="" class="w-full" />`;
      } else if (cardDetails.status === "closed") {
        return `<img src="./assets/Closed.png" alt="">`;
      }
    };
    card.innerHTML = `
                   <div onclick="singleIssue(${cardDetails.id})" class="w-[370px] sm:w-[250px] px-3 sm:px-0 ">
  
  
            <div class="rounded-t-md  h-[200px] bg-white shadow-md p-4">
              <div class="flex justify-between mb-3">
                <div id="open-closed-icon" class="">
                 ${openClosedIcon()}
                </div>
                <div class="">
                  
                  ${priorityBgChange(cardDetails.priority)}
                </div>
              </div>
              <div class="2">
                <h1 class="text-[14px] font-semibold text-[#1F2937] mb-2">
                  ${cardDetails.title}
                </h1>
              </div>
              <div class="3">
                <p class="line-clamp-2 text-[14px] mb-3 text-[#64748B]">
                  ${cardDetails.description}
                </p>
              </div>

              <div class="flex gap-1">
                <div class="flex">

                    ${generateLabels(cardDetails.labels)}

                </div>
    
              </div>
            </div>
            <div class="rounded-b-md bg-white mt-0.5 shadow-md p-4">
              <div class="text-[14px] text-[#64748B]"><p>#${cardDetails.id} ${cardDetails.assignee || "Unassigned"}</p></div>
              <div class="text-[14px] text-[#64748B]"><p>${new Date(cardDetails.createdAt).toLocaleDateString()}</p></div>
            </div>
         
</div> `;

    cardContainer.appendChild(card);
  });
};

// btn group
const btnAllIssue = document.getElementById("all-btn");
const openBtn = document.getElementById("open-btn");
const closedBtn = document.getElementById("closed-btn");

// toggler btn
const toggleBtn = (id) => {
  currentStatus = id;
  const allCountDiv = document.getElementById("all-issue");
  const openCountDiv = document.getElementById("open-count");
  const closedCountDiv = document.getElementById("closed-count");
  const allBtnGet = [btnAllIssue, openBtn, closedBtn];
  allBtnGet.forEach((btn) => {
    btn.classList.remove("active-btn", "inactive-btn");
    if (btn.id === id) {
      btn.classList.add("active-btn"); //add style class
      btn.classList.remove("inactive-btn"); //remove style class
    } else {
      btn.classList.add("inactive-btn"); //add style class
      btn.classList.remove("active-btn"); //remove style class
    }
  });

  // issue content
  if (id === "all-btn") {
    allCountDiv.classList.remove("hidden");
    openCountDiv.classList.add("hidden");
    closedCountDiv.classList.add("hidden");
  } else if (id === "open-btn") {
    allCountDiv.classList.add("hidden");
    openCountDiv.classList.remove("hidden");
    closedCountDiv.classList.add("hidden");
  } else if (id === "closed-btn") {
    allCountDiv.classList.add("hidden");
    openCountDiv.classList.add("hidden");
    closedCountDiv.classList.remove("hidden");
  }
  filterIssues(id);
};

// date filtering
const filterIssues = async (filterType) => {
  document.getElementById("card-container").innerHTML =
    `<div class="col-span-full mx-auto"><span class="loading loading-spinner loading-xl"></span></div>`;
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  try {
    const res = await fetch(url);
    const data = await res.json();
    let filteredData = data.data;
    if (filterType === "open-btn") {
      filteredData = data.data.filter((issue) => issue.status === "open");
    } else if (filterType === "closed-btn") {
      filteredData = data.data.filter((issue) => issue.status === "closed");
    }
    allIssueDisplay(filteredData);
  } catch (error) {
    document.getElementById("card-container").innerHTML =
      "<p class='text-red-500 text-3xl flex justify-center items-center col-span-full'>Failed to Load Card</p>";
  }
};

const searchItemInApi = async () => {
  const searchValue = document.getElementById("input-search");
  const searchItem = searchValue.value.trim();
  if (searchItem === "") {
    allIssue();
    return;
  }
  document.getElementById("card-container").innerHTML =
    `<div class="col-span-full mx-auto"><span class="loading loading-spinner loading-xl"></span></div>`;

  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchItem}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const searchResults = data.data || [];
    if (searchResults.length === 0) {
      document.getElementById("card-container").innerHTML =
        `<p class='text-gray-500 text-xl col-span-full text-center'>No issues found for "${searchItem}"</p>`;
    } else {
      allIssueDisplay(searchResults);
    }
  } catch (error) {
    document.getElementById("card-container").innerHTML =
      "<p class='text-red-500 text-3xl flex justify-center items-center col-span-full'>Failed to Load Card</p>";
  }
};

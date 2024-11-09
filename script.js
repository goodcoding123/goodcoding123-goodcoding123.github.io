// 메모 불러오기
document.addEventListener('DOMContentLoaded', loadMemos);

function addMemo() {
    const memoInput = document.getElementById("memoInput");
    const memoText = memoInput.value.trim();
    const dateTime = new Date().toLocaleString();

    if (memoText === "") return alert("메모를 입력하세요.");

    const memoList = document.getElementById("memoList");
    const memoItem = document.createElement("li");

    memoItem.innerHTML = `
        <span class="memo-text" onclick="openPopup('${memoText}', '${dateTime}')">${memoText}</span>
        <span class="memo-date">${dateTime}</span>
        <button onclick="deleteMemo(this)">삭제</button>
    `;
    memoList.appendChild(memoItem);

    saveMemo({ text: memoText, date: dateTime });
    memoInput.value = "";
}

function deleteMemo(button) {
    const memoItem = button.parentElement;
    const memoText = memoItem.querySelector('.memo-text').textContent.trim();
    const memoDate = memoItem.querySelector('.memo-date').textContent.trim();

    memoItem.remove();
    removeMemo(memoText, memoDate);
}

function saveMemo(memo) {
    const memos = JSON.parse(localStorage.getItem("memos")) || [];
    memos.push(memo);
    localStorage.setItem("memos", JSON.stringify(memos));
}

function loadMemos() {
    const memos = JSON.parse(localStorage.getItem("memos")) || [];
    const memoList = document.getElementById("memoList");

    memos.forEach(({ text, date }) => {
        const memoItem = document.createElement("li");
        memoItem.innerHTML = `
            <span class="memo-text" onclick="openPopup('${text}', '${date}')">${text}</span>
            <span class="memo-date">${date}</span>
            <button onclick="deleteMemo(this)">삭제</button>
        `;
        memoList.appendChild(memoItem);
    });
}

function removeMemo(memoText, memoDate) {
    const memos = JSON.parse(localStorage.getItem("memos")) || [];
    const updatedMemos = memos.filter((memo) => memo.text !== memoText || memo.date !== memoDate);
    localStorage.setItem("memos", JSON.stringify(updatedMemos));
}

// 팝업 열기
function openPopup(text, date) {
    document.getElementById("popupText").textContent = text;
    document.getElementById("popupDate").textContent = `작성 날짜: ${date}`;
    document.getElementById("popup").style.display = "flex";
}

// 팝업 닫기
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

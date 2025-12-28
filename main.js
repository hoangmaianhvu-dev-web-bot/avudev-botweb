let currentUser = null;

function initApp() {
    auth.onAuthStateChanged(user => {
        if (!user) window.location.href = 'login.html';
        else { currentUser = user; syncData(); showPage('home'); }
    });
}

function toggleSidebar() {
    let sb = document.getElementById("sidebar");
    sb.style.width = sb.style.width === "250px" ? "0" : "250px";
}

function showPage(id) {
    const view = document.getElementById('main-view');
    if(id !== 'init') toggleSidebar();

    if(id === 'home') {
        view.innerHTML = `
            <div class="card"><h3>TOP NGÀY / TUẦN / THÁNG</h3><div id="top-list">Đang tải...</div></div>
            <div class="card" style="text-align:center"><h3>THỐNG KÊ</h3><p>Online: 1.250 người</p></div>`;
    } else if(id === 'task') {
        view.innerHTML = `
            <div class="card">
                <h3>NHIỆM VỤ</h3>
                <div class="api-grid">
                    <button class="btn-blue" onclick="getLink('YeuMoney')">YeuMoney</button>
                    <button class="btn-blue" onclick="getLink('Link4M')">Link4M</button>
                    <button class="btn-blue" onclick="getLink('LayMaNgay')">LayMaNgay</button>
                    <button class="btn-blue" onclick="getLink('XLink')">XLink</button>
                </div>
                <input type="text" id="k-in" placeholder="Dán mã vào đây..."><button class="btn-blue" style="background:#28a745" onclick="verify()">XÁC NHẬN</button>
            </div>`;
    } else if(id === 'wallet') {
        view.innerHTML = `<div class="card"><h3>VÍ TIỀN</h3><h1 id="w-val">0đ</h1><hr>
            <input type="number" id="amt" placeholder="Số tiền"><textarea id="inf" placeholder="STK/Nhà mạng"></textarea>
            <button class="btn-blue" onclick="withdraw()">GỬI LỆNH RÚT</button></div>`;
    }
}

async function getLink(api) {
    const token = Math.random().toString(36).substring(2, 20);
    const dest = CONFIG.WEB_URL + "?key=" + token;
    await db.ref('sessions/' + token).set({uid: currentUser.uid, time: Date.now()});
    
    let url = "";
    const key = CONFIG.API_KEYS[api];
    if(api==='YeuMoney') url = `https://yeumoney.com/QL_api.php?token=${key}&format=text&url=${encodeURIComponent(dest)}`;
    else if(api==='Link4M') url = `https://link4m.co/api-shorten/v2?api=${key}&url=${encodeURIComponent(dest)}`;
    else if(api==='LayMaNgay') url = `https://laymangay.com/api?api=${key}&url=${encodeURIComponent(dest)}`;
    else if(api==='XLink') url = `https://xlink.co/api?token=${key}&url=${encodeURIComponent(dest)}`;
    
    window.open(url, "_blank");
}

async function verify() {
    const k = document.getElementById('k-in').value;
    const snap = await db.ref('sessions/'+k).once('value');
    if(snap.exists() && snap.val().uid === currentUser.uid) {
        await db.ref('users/'+currentUser.uid+'/balance').transaction(b=>(b||0)+250);
        await db.ref('sessions/'+k).remove();
        alert("Thành công +250đ"); location.reload();
    } else alert("Mã sai!");
}

function syncData() {
    db.ref('users/'+currentUser.uid).on('value', s => {
        const b = (s.val().balance || 0).toLocaleString() + "đ";
        document.getElementById('top-balance').innerText = b;
        if(document.getElementById('w-val')) document.getElementById('w-val').innerText = b;
    });
}
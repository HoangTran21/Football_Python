// PENALTY MASTER: Nâng cấp với 50 câu hỏi và trợ giúp!
// === CẤU HÌNH SUPABASE ===
const SUPABASE_URL = 'https://djkmfemvlscwhuflghsm.supabase.co'.trim();
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqa21mZW12bHNjd2h1ZmxnaHNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3MTczMDAsImV4cCI6MjA5MTI5MzMwMH0.xgtNymE3c8J1Da-BdsHMn4gVmM3FGGYfb1ZbOvVYq7w'.trim();

let supabaseClient;
try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log("Supabase Client đã khởi tạo thành công!");
} catch (e) {
    console.error("Lỗi khởi tạo Supabase:", e);
    alert("Không thể kết nối với Supabase. Hãy kiểm tra lại URL và Key!");
}
// =========================

// Ngân hàng 50 câu hỏi Python
const questionBank = [
    { m: "In ra chuỗi 'Hello'", r: /print\s*\(\s*['\"]Hello['\"]\s*\)/, h: "Sử dụng hàm print('Hello')", w: "Nhà thông thái: 'Bạn cần hàm print và nội dung nằm trong ngoặc nháy nhé!'" },
    { m: "In ra số 2026", r: /print\s*\(\s*2026\s*\)/, h: "print(2026)", w: "Số thì không cần dấu nháy đâu em!" },
    { m: "In giá trị của biến x", r: /print\s*\(\s*x\s*\)/, h: "print(x)", w: "Nhà thông thái: 'In biến thì chỉ cần bỏ tên biến vào ngoặc thôi.'" },
    { m: "In nhiều giá trị: 'A' và 'B'", r: /print\s*\(\s*['\"]A['\"]\s*,\s*['\"]B['\"]\s*\)/, h: "print('A', 'B')", w: "Dùng dấu phẩy để in nhiều thứ cùng lúc nhé." },
    { m: "Tạo biến x có giá trị 5", r: /\bx\s*=\s*5\b/, h: "x = 5", w: "Dùng dấu = để gán giá trị cho biến." },
    { m: "Tạo biến y có giá trị 20", r: /\by\s*=\s*20\b/, h: "y = 20", w: "Tên biến bên trái, giá trị bên phải." },
    { m: "Gán giá trị biến y cho x", r: /\bx\s*=\s*y\b/, h: "x = y", w: "Lệnh này sẽ copy giá trị từ y sang x." },
    { m: "Tạo biến name là 'Python'", r: /name\s*=\s*['\"]Python['\"]/, h: "name = 'Python'", w: "Chuỗi ký tự bắt buộc phải có dấu nháy." },
    { m: "Thực hiện phép cộng 2 + 3", r: /2\s*\+\s*3/, h: "2 + 3", w: "Dùng dấu + thông thường thôi." },
    { m: "Thực hiện phép trừ 5 - 2", r: /5\s*-\s*2/, h: "5 - 2", w: "Toán tử trừ là dấu gạch ngang -." },
    { m: "Thực hiện phép nhân 4 nhân 3", r: /4\s*\*\s*3/, h: "Sử dụng dấu *", w: "Lưu ý: Trong lập trình nhân là dấu sao *." },
    { m: "Thực hiện phép chia 10 cho 2", r: /10\s*\/\s*2/, h: "Sử dụng dấu /", w: "Phép chia dùng dấu xuyệt phải /." },
    { m: "Chia lấy phần nguyên 10 cho 3", r: /10\s*\/\/\s*3/, h: "Sử dụng dấu //", w: "Dùng hai dấu // để lấy phần nguyên (ví dụ 10//3 được 3)." },
    { m: "Chia lấy phần dư 10 cho 3", r: /10\s*%\s*3/, h: "Sử dụng dấu %", w: "Dấu % giúp lấy phần dư của phép chia." },
    { m: "Tính lũy thừa 2 mũ 3", r: /2\s*\*\*\s*3/, h: "Sử dụng dấu **", w: "Dùng hai dấu sao ** để tính số mũ nhé." },
    { m: "Tạo một chuỗi tên 'python'", r: /['\"]python['\"]/, h: "Bao quanh bởi dấu nháy", w: "Chuỗi có thể dùng nháy đơn hoặc nháy kép." },
    { m: "Nối chuỗi 'abc' và 'def'", r: /['\"]abc['\"]\s*\+\s*['\"]def['\"]/, h: "'abc' + 'def'", w: "Dùng dấu + để dính các chuỗi lại với nhau." },
    { m: "Đếm số ký tự trong chuỗi 'code'", r: /len\s*\(\s*['\"]code['\"]\s*\)/, h: "len('code')", w: "len là viết tắt của length (độ dài)." },
    { m: "Lặp lại chuỗi 'Hi' 3 lần", r: /['\"]Hi['\"]\s*\*\s*3/, h: "'Hi' * 3", w: "Dấu * với chuỗi sẽ làm nó lặp lại." },
    { m: "Viết hoa chuỗi s", r: /s\.upper\s*\(\s*\)/, h: "s.upper()", w: "Hàm .upper() sẽ biến tất cả thành chữ hoa." },
    { m: "Hàm nhập dữ liệu từ phím", r: /input\s*\(\s*\)/, h: "Sử dụng input()", w: "Hàm này dùng để nhận tương tác từ người dùng." },
    { m: "Gán x bằng dữ liệu nhập vào", r: /\bx\s*=\s*input\s*\(\s*\)/, h: "x = input()", w: "Nhà thông thái: 'Đừng quên cặp ngoặc đơn sau input nhé!'" },
    { m: "Nhập kèm lời mời 'Nhập tên:'", r: /input\s*\(\s*['\"]Nhập tên:['\"]\s*\)/, h: "input('Nhập tên:')", w: "Bạn có thể đưa lời mời vào trong hàm input." },
    { m: "Kiểm tra x có bằng 5 không", r: /\bx\s*==\s*5\b/, h: "Dùng dấu ==", w: "Một dấu = là gán, hai dấu == là so sánh bằng." },
    { m: "Kiểm tra x có khác 10 không", r: /\bx\s*!=\s*10\b/, h: "Dùng dấu !=", w: "Dấu chấm than và dấu bằng có nghĩa là 'không bằng'." },
    { m: "Kiểm tra x lớn hơn 3", r: /\bx\s*>\s*3\b/, h: "x > 3", w: "Dùng toán tử so sánh lớn hơn >." },
    { m: "Kiểm tra x nhỏ hơn hoặc bằng 7", r: /\bx\s*<=\s*7\b/, h: "x <= 7", w: "Dấu nhỏ hơn viết trước, dấu bằng viết sau." },
    { m: "Cấu trúc if cơ bản", r: /if\s+.+:/, h: "if điều_kiện:", w: "Nhà thông thái: 'Dấu hai chấm ở cuối dòng if là bắt buộc!'" },
    { m: "Nếu x bằng 5 thì...", r: /if\s+x\s*==\s*5\s*:/, h: "if x == 5:", w: "Đừng quên hai dấu bằng và dấu hai chấm nhé." },
    { m: "Kiểm tra nếu x dương (x > 0)", r: /if\s+x\s*>\s*0\s*:/, h: "if x > 0:", w: "Điều kiện nằm giữa if và dấu hai chấm." },
    { m: "Tạo dãy số từ 0 đến 4", r: /range\s*\(\s*5\s*\)/, h: "range(5)", w: "Hàm range(n) tạo dãy từ 0 đến n-1." },
    { m: "Vòng lặp for lặp 10 lần", r: /for\s+\w+\s+in\s+range\s*\(\s*10\s*\)\s*:/, h: "for i in range(10):", w: "Cấu trúc vòng lặp for cần dấu hai chấm." },
    { m: "Vòng lặp while x nhỏ hơn 5", r: /while\s+x\s*<\s*5\s*:/, h: "while x < 5:", w: "While sẽ lặp chừng nào điều kiện còn đúng." },
    { m: "Tạo một list rỗng tên a", r: /\ba\s*=\s*\[\s*\]/, h: "a = []", w: "Dùng ngoặc vuông [] để tạo danh sách." },
    { m: "Tạo list có 3 số: 1, 2, 3", r: /\[\s*1\s*,\s*2\s*,\s*3\s*\]/, h: "[1, 2, 3]", w: "Các phần tử ngăn cách nhau bởi dấu phẩy." },
    { m: "Thêm số 10 vào cuối list a", r: /a\.append\s*\(\s*10\s*\)/, h: "a.append(10)", w: "Hàm .append() dùng để thêm phần tử vào list." },
    { m: "Xóa hết các phần tử trong list a", r: /a\.clear\s*\(\s*\)/, h: "a.clear()", w: "Clear sẽ làm sạch danh sách của bạn." },
    { m: "Lấy phần tử đầu tiên của list a", r: /a\s*\[\s*0\s*\]/, h: "a[0]", w: "Trong Python, vị trí đầu tiên là số 0." },
    { m: "Định nghĩa hàm tên 'hello'", r: /def\s+hello\s*\(\s*\)\s*:/, h: "def hello():", w: "Dùng từ khóa def để tạo hàm mới." },
    { m: "Gọi thực thi hàm hello()", r: /hello\s*\(\s*\)/, h: "hello()", w: "Viết tên hàm kèm cặp ngoặc để chạy nó." },
    { m: "Ép kiểu x sang số nguyên", r: /int\s*\(\s*x\s*\)/, h: "int(x)", w: "Hàm int() giúp chuyển đổi sang kiểu số nguyên." },
    { m: "Ép kiểu x sang số thực", r: /float\s*\(\s*x\s*\)/, h: "float(x)", w: "Hàm float() dùng cho số thập phân." },
    { m: "Ép kiểu x sang chuỗi", r: /str\s*\(\s*x\s*\)/, h: "str(x)", w: "Hàm str() biến mọi thứ thành chữ." },
    { m: "Viết một dòng ghi chú (comment)", r: /#.+/, h: "Dùng dấu #", w: "Bất cứ thứ gì sau dấu # sẽ không bị máy tính chạy." },
    { m: "Giá trị Đúng trong Logic", r: /\bTrue\b/, h: "True", w: "Lưu ý: Python viết hoa chữ T trong True." },
    { m: "Giá trị Sai trong Logic", r: /\bFalse\b/, h: "False", w: "Lưu ý: Python viết hoa chữ F trong False." },
    { m: "Kiểm tra kiểu dữ liệu của x", r: /type\s*\(\s*x\s*\)/, h: "type(x)", w: "Hàm type giúp bạn biết x là số hay chuỗi." },
    { m: "Thoát vòng lặp lập tức", r: /\bbreak\b/, h: "break", w: "Dùng lệnh break để dừng vòng lặp ngay chưa cần xong." }
];

// Ngân hàng câu hỏi Module 2: Cấu trúc dữ liệu & Giải thuật
const questionBank2 = [
    { m: "Thêm 'Cam' vào tập hợp (set) s", r: /s\.add\s*\(\s*['\"]Cam['\"]\s*\)/, h: "s.add('Cam')", w: "Set dùng hàm .add để thêm phần tử mới." },
    { m: "Xóa 'Táo' khỏi tập hợp s", r: /s\.remove\s*\(\s*['\"]Táo['\"]\s*\)/, h: "s.remove('Táo')", w: "Dùng .remove để xóa phần tử cụ thể." },
    { m: "Tạo dictionary d có key 'id' bằng 1", r: /d\s*=\s*\{\s*['\"]id['\"]\s*:\s*1\s*\}/, h: "d = {'id': 1}", w: "Dictionary dùng ngoặc nhọn và cặp key:value." },
    { m: "Lấy giá trị của key 'name' trong d", r: /d\s*\[\s*['\"]name['\"]\s*\]|d\.get\s*\(\s*['\"]name['\"]\s*\)/, h: "d['name'] hoặc d.get('name')", w: "Bạn có thể dùng ngoặc vuông hoặc hàm .get()." },
    { m: "Lấy danh sách tất cả các key của d", r: /d\.keys\s*\(\s*\)/, h: "d.keys()", w: "Hàm này trả về toàn bộ 'tên' các mục trong dict." },
    { m: "Kiểm tra 'age' có trong d không", r: /['\"]age['\"]\s+in\s+d/, h: "'age' in d", w: "Dùng từ khóa 'in' để kiểm tra sự tồn tại." },
    { m: "Tạo tuple t có 2 số: 10, 20", r: /t\s*=\s*\(\s*10\s*,\s*20\s*\)/, h: "t = (10, 20)", w: "Tuple dùng ngoặc đơn và không thể thay đổi sau khi tạo." },
    { m: "Lấy phần tử cuối của list a", r: /a\s*\[\s*-1\s*\]/, h: "a[-1]", w: "Chỉ số âm lùi từ cuối list lên đầu." },
    { m: "Cắt list a từ đầu đến phần tử thứ 3", r: /a\s*\[\s*:\s*3\s*\]/, h: "a[:3]", w: "Dùng kỹ thuật slicing với dấu hai chấm." },
    { m: "Đảo ngược list a", r: /a\.reverse\s*\(\s*\)/, h: "a.reverse()", w: "Dùng hàm reverse hoặc kỹ thuật slicing [::-1]." },
    { m: "Sắp xếp list a tăng dần", r: /a\.sort\s*\(\s*\)/, h: "a.sort()", w: "Hàm sort() sẽ thay đổi list gốc." },
    { m: "Hợp (union) hai tập hợp s1, s2", r: /s1\.union\s*\(\s*s2\s*\)|s1\s*\|\s*s2/, h: "s1.union(s2)", w: "Hợp là gộp tất cả phần tử không trùng lặp." },
    { m: "Giao (intersection) s1, s2", r: /s1\.intersection\s*\(\s*s2\s*\)|s1\s*&\s*s2/, h: "s1.intersection(s2)", w: "Giao là lấy các phần tử chung của cả hai." },
    { m: "Cập nhật key 'score' trong d thành 100", r: /d\s*\[\s*['\"]score['\"]\s*\]\s*=\s*100/, h: "d['score'] = 100", w: "Gán giá trị mới giống như biến thông thường." },
    { m: "Tính tổng các phần tử trong list a", r: /sum\s*\(\s*a\s*\)/, h: "sum(a)", w: "Hàm sum() cực kỳ tiện lợi trong Python." },
    { m: "Tìm số lớn nhất trong list a", r: /max\s*\(\s*a\s*\)/, h: "max(a)", w: "Sử dụng hàm max() nhé." },
    { m: "Xóa phần tử cuối list a và trả về nó", r: /a\.pop\s*\(\s*\)/, h: "a.pop()", w: "Hàm pop() mặc định xóa phần tử cuối." },
    { m: "Lồng 2 list: [1, [2, 3]]", r: /\[\s*1\s*,\s*\[\s*2\s*,\s*3\s*\]\s*\]/, h: "[1, [2, 3]]", w: "List có thể chứa các list khác bên trong." },
    { m: "Dạng List Comprehension: [i for i in a]", r: /\[\s*\w+\s+for\s+\w+\s+in\s+.*\s*\]/, h: "[i for i in range(5)]", w: "Đây là cách tạo list cực nhanh trong Python." },
    { m: "Xóa dictionary d hoàn toàn", r: /d\.clear\s*\(\s*\)/, h: "d.clear()", w: "Lệnh này làm trống mọi thứ trong dict." },
    { m: "Đếm số lần 'A' xuất hiện trong list a", r: /a\.count\s*\(\s*['\"]A['\"]\s*\)/, h: "a.count('A')", w: "Sử dụng hàm .count()." },
    { m: "Chèn 'X' vào vị trí số 1 của list a", r: /a\.insert\s*\(\s*1\s*,\s*['\"]X['\"]\s*\)/, h: "a.insert(1, 'X')", w: "Dùng .insert(vị_trí, giá_trị)." },
    { m: "Chuyển list a thành set", r: /set\s*\(\s*a\s*\)/, h: "set(a)", w: "Ép kiểu sang set sẽ loại bỏ các phần tử trùng." },
    { m: "Chuyển tuple t thành list", r: /list\s*\(\s*t\s*\)/, h: "list(t)", w: "Dùng hàm list() để chuyển đổi." },
    { m: "Câu lệnh pass (không làm gì cả)", r: /\bpass\b/, h: "pass", w: "Dùng pass khi bạn muốn để trống một khối lệnh." }
];

let selectedModule = 1;
let activeQuestions = [];
const directions = ["Góc Trái", "Chính Giữa", "Góc Phải"];
let gameStarted = false;
let currentQuestion = 0;
let score = 0;
let lives = 3;
let shooting = false;
let helps = { call: false, wise: false };
let playerName = "L";
let playerNumber = "22";

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const cw = canvas.width;
const ch = canvas.height;

const goalPos = { x: cw / 2, y: 100, w: 320, h: 180 };
const ballStart = { x: cw / 2, y: ch - 60, scale: 1 };
let ball = { ...ballStart, rotation: 0 };
let goalie = { x: cw / 2, y: 90, rotation: 0, state: 'idle', color: '#f1c40f' }; // Onana yellow/gold shirt
let player = { x: cw / 2 - 40, y: ch - 60, state: 'idle', thought: null };

function drawField() {
    // Pitch
    const grad = ctx.createLinearGradient(0, ch, 0, 150);
    grad.addColorStop(0, '#1e8449');
    grad.addColorStop(1, '#2ecc71');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, cw, ch);

    // Markings
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath(); ctx.arc(cw / 2, ballStart.y, 80, Math.PI, 0); ctx.stroke();
    // Penalty area
    ctx.strokeRect(cw / 2 - 220, 50, 440, 160);

    // Net
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i <= goalPos.w; i += 20) {
        ctx.moveTo(goalPos.x - goalPos.w / 2 + i, goalPos.y - goalPos.h / 2);
        ctx.lineTo(goalPos.x - goalPos.w / 2 + i, goalPos.y + goalPos.h / 2);
    }
    for (let i = 0; i <= goalPos.h; i += 20) {
        ctx.moveTo(goalPos.x - goalPos.w / 2, goalPos.y - goalPos.h / 2 + i);
        ctx.lineTo(goalPos.x + goalPos.w / 2, goalPos.y - goalPos.h / 2 + i);
    }
    ctx.stroke();

    // Posts
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 10;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeRect(goalPos.x - goalPos.w / 2, goalPos.y - goalPos.h / 2, goalPos.w, goalPos.h);

    // Scoreboard on field
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.roundRect(10, 10, 125, 75, 12);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '700 13px Outfit';
    ctx.fillText("LƯỢT: " + (currentQuestion + 1) + "/10", 20, 30);
    ctx.fillStyle = '#f1c40f';
    ctx.fillText("BÀN: " + score, 20, 48);
    ctx.fillStyle = '#e74c3c';
    let hearts = "";
    for (let i = 0; i < 3; i++) {
        hearts += (i < lives) ? "❤️" : "🖤";
    }
    ctx.fillText("TIM: " + hearts, 20, 66);
    ctx.restore();
}

function drawChibi(x, y, color, rotation = 0, state = 'idle', isGoalie = false, scale = 1) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.rotate(rotation);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 45, 20, 8, 0, 0, Math.PI * 2); ctx.fill();

    // Skin Color (Onana: #4e342e, Player: #f3c19d)
    const skinColor = isGoalie ? '#4e342e' : '#f3c19d';

    // Shirt
    ctx.fillStyle = color;
    ctx.fillRect(-12, 0, 24, 40);

    // Limbs
    ctx.strokeStyle = skinColor;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';

    if (state === 'kicking') {
        ctx.beginPath();
        ctx.moveTo(-6, 40); ctx.lineTo(-12, 55);
        ctx.moveTo(6, 40); ctx.lineTo(20, 42); ctx.stroke();
    } else if (state === 'diving') {
        ctx.beginPath();
        ctx.moveTo(-6, 40); ctx.lineTo(-15, 52);
        ctx.moveTo(6, 40); ctx.lineTo(15, 52); ctx.stroke();
    } else if (state === 'running') {
        const bounce = Math.sin(Date.now() / 50) * 8;
        ctx.beginPath();
        ctx.moveTo(-7, 40); ctx.lineTo(-7 - bounce, 55 + Math.abs(bounce));
        ctx.moveTo(7, 40); ctx.lineTo(7 + bounce, 55 - Math.abs(bounce));
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.moveTo(-7, 40); ctx.lineTo(-7, 55);
        ctx.moveTo(7, 40); ctx.lineTo(7, 55); ctx.stroke();
    }

    // Arms
    if (isGoalie) {
        if (state === 'diving') {
            ctx.beginPath();
            ctx.moveTo(-12, 10); ctx.lineTo(-30, -5);
            ctx.moveTo(12, 10); ctx.lineTo(30, -5); ctx.stroke();
        } else if (state === 'catching') {
            ctx.beginPath();
            ctx.moveTo(-12, 12); ctx.lineTo(-20, -10);
            ctx.moveTo(12, 12); ctx.lineTo(20, -10); ctx.stroke();
        } else {
            ctx.beginPath();
            ctx.moveTo(-12, 10); ctx.lineTo(-25, 25);
            ctx.moveTo(-12, 10); ctx.lineTo(-25, 25);
            ctx.moveTo(12, 10); ctx.lineTo(25, 25); ctx.stroke();
        }
    } else {
        ctx.beginPath();
        if (state === 'running') {
            const swing = Math.sin(Date.now() / 50) * 10;
            ctx.moveTo(-12, 10); ctx.lineTo(-20 + swing, 30);
            ctx.moveTo(12, 10); ctx.lineTo(20 - swing, 30);
        } else {
            ctx.moveTo(-12, 10); ctx.lineTo(-20, 30);
            ctx.moveTo(12, 10); ctx.lineTo(20, 30);
        }
        ctx.stroke();
    }

    // Head
    ctx.fillStyle = skinColor;
    ctx.beginPath(); ctx.arc(0, -15, 22, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = isGoalie ? '#111' : '#d35400';
    ctx.beginPath(); ctx.arc(0, -20, 23, Math.PI, 0); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-8, -15, 4, 0, Math.PI * 2); ctx.arc(8, -15, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#333';
    ctx.beginPath(); ctx.arc(-8, -15, 1.5, 0, Math.PI * 2); ctx.arc(8, -15, 1.5, 0, Math.PI * 2); ctx.fill();

    // Mouth
    ctx.strokeStyle = '#333'; ctx.lineWidth = 1.5; ctx.beginPath();
    if (state === 'sad') ctx.arc(0, -5, 5, Math.PI, 0);
    else if (state === 'smile' || state === 'catching') ctx.arc(0, -8, 7, 0, Math.PI);
    else ctx.arc(0, -8, 4, 0.2, Math.PI - 0.2);
    ctx.stroke();

    // Shirt Text (Name & Number)
    ctx.fillStyle = isGoalie ? '#000' : '#fff';
    ctx.textAlign = 'center';

    // Name
    const nameToDraw = isGoalie ? 'ONANA' : playerName;
    const numToDraw = isGoalie ? '24' : playerNumber;

    // Name (Top of shirt) - Dynamic scaling for length
    let msgFontSize = nameToDraw.length > 6 ? 7 : 9;
    ctx.font = `800 ${msgFontSize}px Outfit`;
    ctx.fillText(nameToDraw, 0, 14, 22);

    // Number (Bottom of shirt)
    ctx.font = '800 18px Outfit';
    ctx.fillText(numToDraw, 0, 32, 22);

    ctx.restore();
}

function drawBall() {
    ctx.save();
    ctx.translate(ball.x, ball.y);
    ctx.scale(ball.scale, ball.scale);
    ctx.rotate(ball.rotation);

    // Ball Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath(); ctx.ellipse(0, 18, 14, 6, 0, 0, Math.PI * 2); ctx.fill();

    // 3D Ball Base
    const ballGrad = ctx.createRadialGradient(-5, -5, 2, 0, 0, 15);
    ballGrad.addColorStop(0, '#fff');
    ballGrad.addColorStop(0.8, '#f0f0f0');
    ballGrad.addColorStop(1, '#bbb');
    ctx.fillStyle = ballGrad;
    ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.fill();

    // Realistic Hexagons
    ctx.fillStyle = '#222';
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#ddd';
    for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5;
        const hX = Math.cos(angle) * 8;
        const hY = Math.sin(angle) * 8;
        ctx.beginPath(); ctx.arc(hX, hY, 4, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    // Highlight
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.beginPath(); ctx.arc(-5, -5, 4, 0, Math.PI * 2); ctx.fill();

    ctx.restore();
}

function drawThoughtBubble(x, y, text) {
    if (!text) return;
    ctx.save();

    // Set font first to measure correctly
    ctx.font = '700 13px Outfit';
    const textWidth = ctx.measureText(text).width;
    const bubbleWidth = textWidth + 40; // Add padding

    ctx.fillStyle = '#fff';
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;

    // Position bubble higher or further right depending on scale
    const bubbleX = x + 80;
    const bubbleY = y - 90;

    // Large Bubble
    ctx.beginPath();
    ctx.ellipse(bubbleX, bubbleY, bubbleWidth / 2, 35, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Small connector circles
    ctx.beginPath(); ctx.arc(x + 20, y - 55, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x + 10, y - 35, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

    ctx.fillStyle = '#333';
    ctx.textAlign = 'center';
    ctx.fillText(text, bubbleX, bubbleY + 5);

    ctx.restore();
}

function render() {
    drawField();
    drawChibi(goalie.x, goalie.y, goalie.color, goalie.rotation, goalie.state, true, 1.8);
    drawChibi(player.x, player.y, '#e74c3c', 0, player.state, false, 1.8);
    if (player.thought) {
        drawThoughtBubble(player.x - 40, player.y - 30, player.thought);
    }
    drawBall();
}

function animateShot(dir, isGoal, cb) {
    const targets = [
        { x: goalPos.x - 120, y: goalPos.y - 40 },
        { x: goalPos.x, y: goalPos.y - 20 },
        { x: goalPos.x + 120, y: goalPos.y - 40 }
    ];
    const target = targets[dir];
    let goalieDiveDir = !isGoal ? dir : (dir + (Math.random() < 0.5 ? 1 : 2)) % 3;
    const goalieTargets = [goalPos.x - 100, goalPos.x, goalPos.x + 100];
    const gTargetX = goalieTargets[goalieDiveDir];

    let runT = 0;
    const playerStartX = player.x;
    const playerTargetX = ball.x - 40;

    function runStep() {
        runT += 0.05;
        player.x = playerStartX + (playerTargetX - playerStartX) * runT;
        player.state = 'running';
        render();
        if (runT < 1) requestAnimationFrame(runStep);
        else {
            player.state = 'kicking';
            startBallShot();
        }
    }

    function startBallShot() {
        let t = 0;
        function step() {
            t += 0.022;
            const startX = ballStart.x, startY = ballStart.y;
            ball.x = startX + (target.x - startX) * t;
            ball.y = startY + (target.y - startY) * t - Math.sin(t * Math.PI) * 120;
            ball.scale = 1 - t * 0.45;
            ball.rotation += 0.4;
            if (t > 0.12) {
                goalie.state = !isGoal && t > 0.6 ? 'catching' : 'diving';
                goalie.x += (gTargetX - goalie.x) * 0.12;
                if (goalieDiveDir === 0) goalie.rotation = -1.1 * (t - 0.12);
                if (goalieDiveDir === 2) goalie.rotation = 1.1 * (t - 0.12);
                if (!isGoal && t > 0.82) {
                    ball.x = goalie.x;
                    ball.y = goalie.y + 40;
                }
            }
            render();
            if (t < 1) requestAnimationFrame(step);
            else {
                player.state = 'idle';
                if (!isGoal) { goalie.state = 'smile'; ball.x = goalie.x; ball.y = goalie.y - 10; }
                else goalie.state = 'sad';
                render(); cb();
            }
        }
        step();
    }
    runStep();
}

async function initGame() {
    try {
        const response = await fetch(`module${selectedModule}.json`);
        const data = await response.json();

        const mcqs = (data.questions || []).map(q => ({ ...q, type: 'mcq' }));
        const codes = (data.coding_tasks || []).map(q => ({ ...q, type: 'code', m: q.q }));

        const allQuestions = [...mcqs, ...codes];
        activeQuestions = allQuestions.sort(() => Math.random() - 0.5).slice(0, 10);

        currentQuestion = 0;
        score = 0;
        lives = 3;
        helps = { call: false, wise: false };
        document.querySelectorAll('.lifeline-btn').forEach(b => b.classList.remove('used'));
        showQuestion();
    } catch (e) {
        console.error("Lỗi tải câu hỏi:", e);
        const bank = selectedModule === 1 ? questionBank : questionBank2;
        activeQuestions = [...bank].sort(() => Math.random() - 0.5).slice(0, 10);
        showQuestion();
    }
}

function selectModule(num) {
    selectedModule = num;
    document.querySelectorAll('.module-card').forEach(c => c.classList.remove('active'));
    document.getElementById('mod' + num).classList.add('active');
}

function startGame() {
    const nameInput = document.getElementById('playerNameInput').value.trim();
    const numInput = document.getElementById('playerNumberInput').value.trim();

    if (nameInput) playerName = nameInput.toUpperCase();
    if (numInput) playerNumber = numInput;

    gameStarted = true;
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    initGame();
}

function showQuestion() {
    if (currentQuestion >= 10) { showFinalResult(); return; }
    const q = activeQuestions[currentQuestion];

    const questionText = q.type === 'mcq' ? q.q : q.m;
    document.getElementById('question').innerText = `Câu ${currentQuestion + 1}: ${questionText}`;

    document.getElementById('hint').innerText = '';
    document.getElementById('directionBox').style.display = 'none';
    document.getElementById('result').innerText = '';
    document.getElementById('result').style.color = '#fff';

    const optsContainer = document.getElementById('optsContainer');
    const answerInput = document.getElementById('answer');
    const submitBtn = document.getElementById('submitBtn');

    if (q.type === 'mcq') {
        answerInput.style.display = 'none';
        submitBtn.style.display = 'none';
        optsContainer.style.display = 'block';
        optsContainer.innerHTML = '';

        q.opts.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'opt-btn';
            btn.innerText = opt;
            btn.onclick = () => checkMCQ(idx);
            optsContainer.appendChild(btn);
        });
    } else {
        optsContainer.style.display = 'none';
        answerInput.style.display = 'block';
        submitBtn.style.display = 'inline-block';
        answerInput.value = '';
    }

    ball = { ...ballStart, rotation: 0 };
    goalie = { x: cw / 2, y: 90, rotation: 0, state: 'idle', color: '#f1c40f' };
    player = { x: cw / 2 - 160, y: ch - 100, state: 'idle', thought: null };
    render();
}

function handleLifeLoss() {
    lives--;
    render();
    if (lives <= 0) {
        showGameOver();
        return true;
    }
    return false;
}

function showGameOver() {
    shooting = false;
    document.getElementById('questionBox').style.display = 'none';
    document.getElementById('directionBox').style.display = 'none';
    document.getElementById('hint').innerText = '';

    saveScore(playerName, playerNumber, score);

    const resultDiv = document.getElementById("result");
    resultDiv.style.color = '#e74c3c';
    resultDiv.innerHTML = `<h3>HẾT LƯỢT! 💔</h3><p>Bạn đã hết tim rồi. Phải bắt đầu lại từ đầu thôi!</p>`;

    const restartBtn = document.createElement("button");
    restartBtn.innerText = "Chơi lại từ đầu";
    restartBtn.className = "start-game-btn";
    restartBtn.style.marginTop = "20px";
    restartBtn.style.width = "auto";
    restartBtn.style.padding = "10px 30px";
    restartBtn.onclick = () => location.reload();
    resultDiv.appendChild(restartBtn);
}

function checkMCQ(idx) {
    if (shooting) return;
    const q = activeQuestions[currentQuestion];
    if (idx === q.ans) {
        document.getElementById('result').innerText = 'Chính xác! Bạn đã sẵn sàng sút bóng.';
        document.getElementById('directionBox').style.display = 'block';
        document.getElementById('optsContainer').style.display = "none";
    } else {
        document.getElementById('result').style.color = '#e74c3c';
        document.getElementById('result').innerText = 'Sai rồi! -1 tim ❤️';
        document.getElementById('hint').innerText = 'Gợi ý: Hãy suy nghĩ kỹ hơn!';
        handleLifeLoss();
    }
}

function submitAnswer() {
    if (shooting) return;
    const val = document.getElementById('answer').value.trim();
    const q = activeQuestions[currentQuestion];

    const regex = typeof q.r === 'string' ? new RegExp(q.r) : q.r;

    if (regex.test(val)) {
        document.getElementById('result').innerText = 'Chính xác! Bạn đã sẵn sàng sút bóng.';
        document.getElementById('directionBox').style.display = 'block';
        document.getElementById("answer").style.display = "none";
        document.getElementById("submitBtn").style.display = "none";
    } else {
        document.getElementById('result').style.color = '#e74c3c';
        document.getElementById('result').innerText = 'Mã code chưa đúng rồi! -1 tim ❤️';
        document.getElementById('hint').innerText = 'Nhà thông thái gợi ý: ' + q.h;
        handleLifeLoss();
    }
}

function shoot(dir) {
    if (shooting) return;
    shooting = true;
    document.getElementById('directionBox').style.display = 'none';
    const goalieGuess = Math.floor(Math.random() * 3);
    const isGoal = dir !== goalieGuess;
    animateShot(dir, isGoal, function () {
        if (isGoal) {
            score++;
            document.getElementById('result').style.color = '#2ecc71';
            document.getElementById('result').innerText = `VÀOOO! Thủ môn bó tay trước cú sút vào ${directions[dir]}!`;
        } else {
            document.getElementById('result').style.color = '#e74c3c';
            document.getElementById('result').innerText = `KHÔNG VÀO! Thủ môn xuất sắc ở ${directions[dir]}!`;
        }
        setTimeout(() => {
            currentQuestion++;
            shooting = false;
            showQuestion();
        }, 2000);
    });
}

function useLifeline(type) {
    if (helps[type]) return;
    helps[type] = true;
    document.getElementById(type + 'Btn').classList.add('used');
    const q = activeQuestions[currentQuestion];

    let resultText = "";
    if (q.type === 'mcq') {
        resultText = q.opts[q.ans];
    } else {
        resultText = (type === 'call') ? q.h : q.w;
    }

    if (type === 'call') {
        const audio = document.getElementById('callAudio');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Audio play failed:", e));
        }
        document.getElementById('callModal').style.display = 'flex';
        document.getElementById('callMsg').innerText = "Số này của ai ấy nhỉ?...";
        document.getElementById('callResult').innerText = "";
        setTimeout(() => {
            document.getElementById('callMsg').innerText = "À, Anh Độ Mixi đây rồi!";
            document.getElementById('callResult').innerHTML = `Anh bảo đáp án là: <div class="highlight-code">${resultText}</div><span class="extra-msg">"Em đừng có mà chối!"</span>`;
            player.thought = "Nà ná na na. Cảm ơn Anh Độ Mixi!";
            render();
        }, 1500);
    } else if (type === 'wise') {
        const audio = document.getElementById('wiseAudio');
        if (audio) {
            audio.currentTime = 0;
            audio.play().catch(e => console.log("Audio play failed:", e));
        }
        document.getElementById('wiseModal').style.display = 'flex';
        document.getElementById('wiseResult').innerText = "";
        setTimeout(() => {
            document.getElementById('wiseMsg').innerText = "Lời khuyên từ nhà thông thái (người Ý):";
            document.getElementById('wiseResult').innerHTML = `Người Ý nói: <div class="highlight-code">${resultText}</div><span class="extra-msg">"Tin chuẩn em nhé!"</span>`;
            player.thought = "Cảm ơn bác Trông Anh Ngược!";
            render();
        }, 1500);
    }
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
    if (id === 'callModal') {
        const audio = document.getElementById('callAudio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    } else if (id === 'wiseModal') {
        const audio = document.getElementById('wiseAudio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    } else if (id === 'finalPrizeModal') {
        const audio = document.getElementById('winAudio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

function scrollToPrizes() {
    closeModal('shotResultModal');
    document.getElementById('prizes').style.display = 'block';
    showRedEnvelopes();
    document.getElementById('prizes').scrollIntoView({ behavior: 'smooth' });
}

let picksAllowed = 0;

function showFinalResult() {
    let msg = `Bạn đã ghi được <b>${score}/10</b> bàn thắng. `;
    const openBtn = document.getElementById('openEnvelopesBtn');

    saveScore(playerName, playerNumber, score);

    if (score >= 6) {
        if (score === 10) picksAllowed = 3;
        else if (score >= 8) picksAllowed = 2;
        else picksAllowed = 1;

        msg += `<br>Phong độ tuyệt vời! Bạn nhận được <b>${picksAllowed}</b> lượt mở bao lì xì. 🔥`;
        openBtn.style.display = 'inline-block';
    } else {
        msg += "<br>Hơi tiếc một chút! Bạn cần ít nhất 6 bàn để nhận được quà lì xì. Hãy cố gắng hơn nhé! 💪";
        openBtn.style.display = 'none';
    }

    document.getElementById('shotResultMsg').innerHTML = msg;
    document.getElementById('shotResultModal').style.display = 'flex';
    document.getElementById("questionBox").style.display = "none";
}

function showRedEnvelopes() {
    document.getElementById("prizes").style.display = "block";
    const container = document.getElementById("envelopeContainer");
    container.innerHTML = '';
    const prizes = [
        { name: "10.000 VND", icon: "💵" },
        { name: "Ra chơi sớm 5 phút", icon: "🔔" },
        { name: "Chúc bạn may mắn lần sau", icon: "🍀" },
        { name: "Khô gà đè tem", icon: "🍗" },
        { name: "Ra chơi sớm 10 phút", icon: "🔔" }
    ];
    prizes.sort(() => Math.random() - 0.5);
    prizes.forEach((prize, index) => {
        const env = document.createElement('div');
        env.className = 'envelope';
        env.id = `env-${index}`;
        env.onclick = () => openEnvelope(index);
        env.innerHTML = `<div class="prize-content"><div class="prize-icon">${prize.icon}</div><div class="prize-value">${prize.name}</div></div>`;
        container.appendChild(env);
    });
}

let pickedPrizes = [];
function openEnvelope(index) {
    const env = document.getElementById(`env-${index}`);
    if (env.classList.contains('opened') || picksAllowed <= 0) return;

    env.classList.add('opened');
    picksAllowed--;

    const prizeValue = env.querySelector('.prize-value').innerText;
    pickedPrizes.push(prizeValue);

    if (prizeValue === "Khô gà đè tem") {
        setTimeout(() => {
            document.getElementById('prizeModal').style.display = 'flex';
        }, 800);
    }

    if (picksAllowed === 0) {
        document.querySelectorAll('.envelope:not(.opened)').forEach(env => {
            env.classList.add('revealed');
            env.onclick = null;
        });
        document.querySelectorAll('.envelope.opened').forEach(env => env.onclick = null);

        setTimeout(async () => {
            const winAudio = document.getElementById('winAudio');
            if (winAudio) {
                winAudio.currentTime = 0;
                winAudio.play().catch(e => console.log("Win audio play failed:", e));
            }
            document.getElementById('finalPrizeMsg').innerHTML = `Bạn đã cực kỳ may mắn mở được: <br><b style="color:#c0392b; font-size: 1.3rem;">${pickedPrizes.join(" & ")}</b>! 🎁`;

            try {
                const { data } = await supabaseClient
                    .from('leaderboard')
                    .select('name, jersey_number, score')
                    .order('score', { ascending: false });

                if (data) {
                    const myRank = data.findIndex(p => p.name === playerName && p.jersey_number == playerNumber && p.score == score) + 1;
                    document.getElementById('leaderboardRank').innerText = `Xếp hạng của bạn: #${myRank > 0 ? myRank : '?'}`;
                }
            } catch (err) {
                console.error("Lỗi lấy thứ hạng:", err);
            }

            document.getElementById('finalPrizeModal').style.display = 'flex';
        }, 1200);
    } else {
        document.getElementById("result").innerText = `Đã mở: ${prizeValue}! Còn ${picksAllowed} lượt chọn nữa. 🔥`;
    }
}



window.onload = function () {
    renderLeaderboard();
};

async function renderLeaderboard() {
    const listElement = document.getElementById('leaderboardList');
    if (!listElement) return;

    const filterVal = document.getElementById('leaderboardFilter')?.value || "1";

    try {
        const { data: leaderboard, error } = await supabaseClient
            .from('leaderboard')
            .select('*')
            .eq('module', filterVal)
            .order('score', { ascending: false })
            .limit(10);

        if (error) throw error;

        if (!leaderboard || leaderboard.length === 0) {
            listElement.innerHTML = '<div class="empty-state">Chưa có dữ liệu xếp hạng</div>';
            return;
        }

        listElement.innerHTML = leaderboard.map((player, index) => {
            let rankIcon = index + 1;
            if (index === 0) rankIcon = "🥇";
            else if (index === 1) rankIcon = "🥈";
            else if (index === 2) rankIcon = "🥉";

            const displayDate = player.created_at ? new Date(player.created_at).toLocaleString('vi-VN') : 'Mới';

            return `
                <div class="leader-item">
                    <div class="rank">${rankIcon}</div>
                    <div class="leader-info">
                        <span class="leader-name">${player.name} #${player.jersey_number}</span>
                        <span class="leader-meta">${displayDate}</span>
                    </div>
                    <div class="leader-score">${player.score}</div>
                </div>
            `;
        }).join('');
    } catch (err) {
        console.error("Lỗi khi tải bảng xếp hạng:", err);
        listElement.innerHTML = '<div class="empty-state" style="color:#e74c3c">Lỗi kết nối bảng xếp hạng</div>';
    }
}

async function saveScore(name, jerseyNumber, finalScore) {
    const jNum = parseInt(jerseyNumber, 10) || 0;
    try {
        // 1. Tìm bản ghi hiện có của người chơi này trong module hiện tại
        const { data: records, error: fetchError } = await supabaseClient
            .from('leaderboard')
            .select('*')
            .eq('name', name)
            .eq('jersey_number', jNum)
            .eq('module', selectedModule.toString())
            .order('score', { ascending: false })
            .limit(1);

        if (fetchError) throw fetchError;

        const existing = records && records.length > 0 ? records[0] : null;

        if (existing) {
            if (finalScore > existing.score) {
                const { error: updateError } = await supabaseClient
                    .from('leaderboard')
                    .update({ score: finalScore })
                    .eq('id', existing.id);
                if (updateError) throw updateError;
                console.log("Cập nhật điểm thành công!");
            }
        } else {
            // 3. Nếu chưa tồn tại, thêm bản ghi mới kèm thông tin module
            const { error: insertError } = await supabaseClient
                .from('leaderboard')
                .insert([{ name, jersey_number: jNum, score: finalScore, module: selectedModule.toString() }]);
            if (insertError) throw insertError;
            console.log("Lưu điểm mới thành công!");
        }

        // Sau khi lưu, cập nhật filter của bảng xếp hạng về module vừa chơi để người chơi thấy điểm của mình
        if (document.getElementById('leaderboardFilter')) {
            document.getElementById('leaderboardFilter').value = selectedModule.toString();
        }
        renderLeaderboard();
    } catch (err) {
        console.error("Lỗi Supabase chi tiết:", err);
        const errorMsg = err.message || (typeof err === 'string' ? err : 'Lỗi không xác định');
        alert("LƯU ĐIỂM THẤT BẠI!\n\nMã lỗi: " + errorMsg + "\n\nLời khuyên: Bạn hãy nhấn F12 (hoặc Chuột phải -> Kiểm tra) và xem tab 'Console' để thấy chi tiết lỗi màu đỏ nhé!");
    }
}


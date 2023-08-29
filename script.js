document.getElementById('inputTextArea').addEventListener("input", transformText);
document.getElementById('button').addEventListener("click", transformText);
function transformText() {
    const inputTextArea = document.getElementById('inputTextArea');
    const outputTextArea = document.getElementById('outputTextArea');
    const inputText = inputTextArea.value.trim();
    const lines = inputText.split('\n');

    const regex = /([A-F0-9]+) ([A-F0-9]+)/;
    const transformedLines = lines.map(line => {
        const match = line.match(regex);
        if (match) {
            return `patch=1,EE,${match[1]},extended,${match[2]}`;
        }
        return '';
    });

    outputTextArea.value = transformedLines.join('\n');
}


// Salin Text
document.getElementById('copy').addEventListener("click", () => {
    navigator.clipboard.writeText(document.getElementById('outputTextArea').value)
        .then(() => {
            document.getElementById('text2').innerText = "Berhasil Tersalin";
            document.getElementById('text2').style.color = "lightgreen";
            if (document.getElementById('outputTextArea').value == "") {
                document.getElementById('outputTextArea').setAttribute("placeholder", "Berhasil Tersalin Tetapi Text Kosong Atau Tidak Ada Text Yg Tersalin");
            } else {
                document.getElementById('outputTextArea').setAttribute("placeholder", "");
            }
            setTimeout(function () {
                document.getElementById('text2').style.color = "white";
                document.getElementById('text2').innerText = "Hasilnya Disini";
            }, 2000);
        })
        .catch(() => {
            document.getElementById('text2').innerText = "Gagal Tersalin";
            document.getElementById('text2').style.color = "red";
            setTimeout(function () {
                document.getElementById('text2').style.color = "white";
                document.getElementById('text2').innerText = "Hasilnya Disini";
            }, 2000);
        })
});

// paste text
document.getElementById('paste').addEventListener("click", paste);
async function paste() {
    try {
        const clipboardText = await navigator.clipboard.readText();
        if (clipboardText.trim() === "") {
            document.getElementById('inputTextArea').setAttribute("placeholder", "Clipboard Kosong Atau Belum Ada Text Yg Tersalin")
            return;
        } else {
            document.getElementById('inputTextArea').setAttribute("placeholder", "Clipboard Sudah Terisi, Tekan Paste DiKanan Atas")
            document.getElementById('inputTextArea').value = clipboardText;
            document.getElementById('text1').innerText = "Berhasil Menempel";
            document.getElementById('text1').style.color = "lightgreen";
            setTimeout(function () {
                document.getElementById('text1').style.color = "white";
                document.getElementById('text1').innerText = "Inputkan Disini";
            }, 2000);
        }
    } catch (error) {
        document.getElementById('text1').innerText = "Gagal Menempel";
        document.getElementById('text1').style.color = "red";
        setTimeout(function () {
            document.getElementById('text1').style.color = "white";
            document.getElementById('text1').innerText = "Inputkan Disini";
        }, 2000);
    }
}

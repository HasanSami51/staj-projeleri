 const yemekler=[
{ad:"Mercimek Çorbası",kategori:"Corba"},
{ad:"Hamburger", kategori:"Ana Yemek"},   
{ad:"Kadayıf", kategori:"Tatli"},
{ad:"Ayran", kategori:"İçecek"}
 ];

const form=document.querySelector("#menu-form");
const input=document.querySelector("#input1");
const container=document.querySelector("#menu-div1");
const kategoriSelect=document.querySelector("#kategoriler");
const filtreButonlari=document.querySelectorAll(".buton");

let aktifKategori="Tumu";

kategoriSelect.addEventListener("change",function(){
    if(this.value !==""){
        input.disabled=false;
        input.placeholder="Yemek Adı Yazınız...";
        input.focus();
    }else{
        input.disabled=true;
        input.placeholder="önce kategori seçiniz...";
    }
});

function yemekleriEkranaBas(liste){
    container.innerHTML="";
    liste.forEach(yemek=> {
        const kart=document.createElement("div");
        kart.classList.add("menu-kart");

        const icerikDiv=document.createElement("div");
        icerikDiv.classList.add("kart1");

        icerikDiv.textContent=yemek.ad;
        kart.appendChild(icerikDiv);
        container.appendChild(kart);
    });
}
function filtreleVeBas(kategori){
aktifKategori=kategori;
filtreButonlari.forEach(btn => {
        if (btn.getAttribute("data-kategori") === kategori) {
            btn.classList.add("aktif");
        } else {
            btn.classList.remove("aktif");
        }
});
if(kategori==="Tumu"){
    yemekleriEkranaBas(yemekler);
}else{
    const filtrelenmisYemekler=yemekler.filter(yemek=>yemek.kategori===kategori);
    yemekleriEkranaBas(filtrelenmisYemekler);

}
}

form.addEventListener("submit",function(event){
    event.preventDefault();
    const yeniYemekAdi=input.value.trim();
    const secilenkategori=kategoriSelect.value;

    if(yeniYemekAdi === "" || secilenkategori === "") {
        alert("Lütfen hem yemek adını hem de kategoriyi seçin!");
        return;
    }
   
    yemekler.push({
        ad:yeniYemekAdi,
        kategori:secilenkategori
    });
    
    filtreleVeBas(aktifKategori);


    input.value="";
    kategoriSelect.selectedIndex=0;
    input.disabled=true;
    input.placeholder="önce kategori seçiniz...";
});
filtreButonlari.forEach(buton=>{
    buton.addEventListener("click",function(){
        const kategori=this.getAttribute("data-kategori");
        filtreleVeBas(kategori);
    });
});
filtreleVeBas("Tumu");

/* ═══════════════════════════════════════════
   ⚙️  DADOS — substitua por import ../cardapio.js
       quando a estrutura de pastas for criada
   ═══════════════════════════════════════════ */
const ADICIONAIS=[
  {id:"bacon",    nome:"Bacon",                     preco:4.00},
  {id:"blend",    nome:"Blend de carne 130g",       preco:7.00},
  {id:"cheddar",  nome:"Queijo cheddar",            preco:2.00},
  {id:"cebola",   nome:"Cebola caramelizada",       preco:3.00},
  {id:"molched",  nome:"Molho de cheddar artesanal",preco:2.00},
  {id:"molesp",   nome:"Molho especial",            preco:3.00},
  {id:"barbecue", nome:"Molho barbecue",            preco:2.00},
  {id:"cream",    nome:"Cream cheese",              preco:3.00},
  {id:"geleia",   nome:"Geleia de pimenta",         preco:3.00},
];

const CARDAPIO=[
  {id:1, nome:"Xodozinho",      preco:{burger:16.99,combo:22.00,completo:28.00}, descricao:"Blend 100g, cheddar, molho especial"},
  {id:2, nome:"Arretado",       preco:{burger:18.99,combo:24.00,completo:30.00}, descricao:"Blend 130g, cheddar, molho especial, salada"},
  {id:3, nome:"Lampião",        preco:{burger:21.99,combo:27.00,completo:33.00}, descricao:"Blend 130g, cheddar, bacon, molho especial"},
  {id:4, nome:"Matuto",         preco:{burger:22.99,combo:28.00,completo:34.00}, descricao:"Blend 160g, cheddar 2x, creme cheddar, cebola"},
  {id:5, nome:"Vixe Maria",     preco:{burger:23.99,combo:29.00,completo:35.00}, descricao:"Blend 160g, coalho, doce de leite, bacon"},
  {id:6, nome:"Maria Bonita",   preco:{burger:25.99,combo:31.00,completo:37.00}, descricao:"2x blend 130g, cheddar 2x, molho especial"},
  {id:7, nome:"Rei do Cangaço", preco:{burger:28.99,combo:34.00,completo:40.00}, descricao:"Blend 130g, cheddar, costela, cream cheese"},
  {id:8, nome:"Desmantelado",   preco:{burger:28.99,combo:34.00,completo:40.00}, descricao:"2x blend 130g, cheddar 2x, bacon"},
  {id:9, nome:"Mini Hambúrguer",preco:{burger:7.00, combo:12.00,completo:19.00}, descricao:"Blend 40g, queijo, molho especial"},
  {id:10,nome:"Baguete de Cupim Desfiado", preco:{burger:20.00,combo:27.00,completo:34.00}, descricao:"Cupim desfiado, queijo, molho da casa, salada", temPontoCarne:false},
];

const COMBOS=[
  {id:"c1", nome:"Combo Lampião e Maria Bonita", preco:59.99, detalhe:"2 Lampião + Batata G + Refri 1L"},
  {id:"c2", nome:"Combo Cangaceiros",            preco:96.99, detalhe:"4 Arretado + Batata GG + Refri 2L"},
];

const PETISCOS=[
  {id:"bf-p", nome:"Batata Frita P",        preco:7.00,  detalhe:"Batata frita"},
  {id:"bf-g", nome:"Batata Frita G",        preco:10.00, detalhe:"Batata frita"},
  {id:"bt-m", nome:"Batata Turbinada M",    preco:12.00, detalhe:"Batata + cheddar + farofa bacon"},
  {id:"bt-g", nome:"Batata Turbinada G",    preco:20.00, detalhe:"Batata + cheddar + farofa bacon"},
  {id:"aq-p", nome:"Almofada de Queijo P",  preco:12.00, detalhe:"Queijo empanado e frito + geleia de pimenta"},
  {id:"aq-g", nome:"Almofada de Queijo G",  preco:20.00, detalhe:"Queijo empanado e frito + geleia de pimenta"},
];

const BEBIDAS=[
  {id:"coca",        nome:"Coca Lata",        preco:6.00, comboRefri:true},
  {id:"coca-zero",   nome:"Coca Zero Lata",   preco:6.00, comboRefri:true},
  {id:"guarana",     nome:"Guaraná Lata",     preco:6.00, comboRefri:true},
  {id:"guarana-zero",nome:"Guaraná Zero Lata",preco:6.00, comboRefri:true},
  {id:"fanta",       nome:"Fanta Lata",       preco:6.00, comboRefri:true},
  {id:"sprite",      nome:"Sprite Lata",      preco:6.00, comboRefri:true},
  {id:"sprite-zero", nome:"Sprite Zero Lata", preco:6.00, comboRefri:true},
  {id:"h2o",         nome:"H2O Lata",         preco:6.00, comboRefri:true},
  {id:"b2", nome:"Refrigerante 250ml",   preco:4.00},
  {id:"b3", nome:"Antartica 1L",         preco:10.00},
  {id:"b4", nome:"Coca-Cola 1L",         preco:12.00},
  {id:"b5", nome:"Água",                preco:2.00},
  {id:"b6", nome:"Água c/ gás",          preco:4.00},
  {id:"b7", nome:"H²O Limoneto",         preco:6.00},
  {id:"b8", nome:"Schweppes",            preco:6.00},
];

/* categorias para as abas */
const CATEGORIAS=[
  {id:"burgers",  label:"🍔 BURGERS",  itens:()=>CARDAPIO.map(b=>({
      id:`burger-${b.id}`, nome:b.nome,
      preco:b.preco.burger, detalhe:b.descricao,
      _burger:b
    }))
  },
  {id:"combos",   label:"🔥 COMBOS",   itens:()=>COMBOS.map(c=>({id:c.id,nome:c.nome,preco:c.preco,detalhe:c.detalhe,_combo:c}))},
  {id:"petiscos", label:"🍟 PETISCOS", itens:()=>PETISCOS.map(b=>({id:b.id,nome:b.nome,preco:b.preco,detalhe:b.detalhe}))},
  {id:"bebidas",  label:"🥤 BEBIDAS",  itens:()=>BEBIDAS.map(b=>({id:b.id,nome:b.nome,preco:b.preco,detalhe:""}))},
  {id:"adicionais",label:"➕ ADICIONAIS",itens:()=>ADICIONAIS.map(a=>({id:`add-${a.id}`,nome:a.nome,preco:a.preco,detalhe:"Adicional avulso"}))},
];

/* ═══════════════════════════════════════════
   🛒  ESTADO
   ═══════════════════════════════════════════ */
let pedido=[];
let catAtiva="burgers";
let formaPagamento=null;
let entregaTipo=null;

const PONTOS=[
  {id:"mal-passada", label:"Mal passada"},
  {id:"ao-ponto",    label:"Ao ponto"},
  {id:"bem-passada", label:"Bem passada"},
];

// estado do drawer (compartilhado entre burger e combo)
let drawerMode="burger"; // "burger" | "combo"
let drawerBurgerId=null;
let drawerTierIdx=0;
let drawerAdds=new Set();
let drawerPonto=null;
let drawerRefri=null;
let drawerComboId=null;
let drawerComboPonto=null;

/* ═══════════════════════════════════════════
   🖼️  RENDER
   ═══════════════════════════════════════════ */
function fmt(v){return "R$ "+v.toFixed(2).replace(".",",")}
function fmtN(v){return v.toFixed(2).replace(".",",")}

function renderAbas(){
  const tabs=document.getElementById("catTabs");
  tabs.innerHTML=CATEGORIAS.map(c=>`
    <button class="cat-tab${c.id===catAtiva?" active":""}"
      onclick="trocarCat('${c.id}')">${c.label}
    </button>`).join("");
}

function trocarCat(id){
  catAtiva=id;
  renderAbas();
  document.getElementById("searchInput").value="";
  renderProdutos();
}

function renderProdutos(filtro=""){
  const cat=CATEGORIAS.find(c=>c.id===catAtiva);
  let itens=cat.itens();
  if(filtro){
    const q=filtro.toLowerCase();
    itens=itens.filter(i=>i.nome.toLowerCase().includes(q)||i.detalhe?.toLowerCase().includes(q));
  }
  const list=document.getElementById("produtosList");
  if(!itens.length){
    list.innerHTML=`<div style="padding:24px;text-align:center;color:var(--text2);font-size:.8rem;">Nenhum item encontrado.</div>`;
    return;
  }
  const frag=document.createDocumentFragment();

  if(catAtiva==="burgers"&&!filtro){
    CARDAPIO.forEach(b=>{
      const label=document.createElement("div");
      label.className="cat-label";
      label.textContent=b.nome.toUpperCase();
      frag.appendChild(label);
      frag.appendChild(criarItemEl({
        id:`burger-${b.id}`, nome:b.nome,
        preco:b.preco.burger, detalhe:b.descricao,
        _burger:b
      }));
    });
  } else {
    itens.forEach(i=>frag.appendChild(criarItemEl(i)));
  }
  list.innerHTML="";
  list.appendChild(frag);
}

function criarItemEl(item){
  const div=document.createElement("div");
  div.className="produto-item";
  // burgers e combos abrem drawer (precisam de ponto da carne); demais adicionam direto
  const onclick=item._burger
    ?`abrirDrawerBurger(${item._burger.id})`
    :item._combo
      ?`abrirDrawerCombo('${item._combo.id}')`
      :"";
  div.innerHTML=`
    <div class="produto-info">
      <div class="produto-nome">${item.nome}</div>
      ${item.detalhe&&!item._burger&&!item._combo?`<div class="produto-detalhe">${item.detalhe}</div>`:""}
    </div>
    <div class="produto-preco">${fmt(item.preco)}</div>
    <button class="btn-add-item"${onclick?` onclick="${onclick}"`:""}>+</button>`;
  if(!item._burger&&!item._combo){
    div.querySelector(".btn-add-item").addEventListener("click",()=>adicionarItem(item));
  }
  return div;
}

function filtrar(v){renderProdutos(v);}

/* ═══════════════════════════════════════════
   🍔  DRAWER DE BURGER
   ═══════════════════════════════════════════ */
function abrirDrawerBurger(bid){
  drawerMode="burger";
  drawerBurgerId=bid;
  drawerTierIdx=0;
  drawerAdds=new Set();
  drawerPonto=null;
  drawerRefri=null;
  const b=CARDAPIO.find(x=>x.id===bid);
  document.getElementById("pdvDrawerNome").textContent=b.nome;

  const tiers=[
    {label:"Só o burger",              preco:b.preco.burger},
    {label:"Burger + Refri lata",      preco:b.preco.combo},
    {label:"Burger + Refri + Batata P",preco:b.preco.completo},
  ];
  const refris=BEBIDAS.filter(x=>x.comboRefri);

  document.getElementById("pdvDrawerBody").innerHTML=`
    <div class="pdv-section-label">OPÇÃO</div>
    <div class="pdv-tier-row">
      ${tiers.map((t,i)=>`
        <div class="pdv-tier-opt${i===0?" selected":""}" id="pdvTier-${i}"
          onclick="selecionarTier(${i})">
          <div class="pdv-tier-radio"></div>
          <span class="pdv-tier-label">${t.label}</span>
          <span class="pdv-tier-preco">R$&nbsp;${fmtN(t.preco)}</span>
        </div>`).join("")}
    </div>
    ${b.temPontoCarne!==false?`
    <div class="pdv-section-label">PONTO DA CARNE</div>
    <div class="pdv-tier-row" id="pdvPontoRow">
      ${PONTOS.map(p=>`
        <div class="pdv-tier-opt" id="pdvPonto-${p.id}" onclick="selecionarPonto('${p.id}')">
          <div class="pdv-tier-radio"></div>
          <span class="pdv-tier-label">${p.label}</span>
        </div>`).join("")}
    </div>`:""}
    <div id="pdvRefriSection" style="display:none">
      <div class="pdv-section-label">REFRIGERANTE</div>
      <div class="pdv-tier-row" id="pdvRefriRow">
        ${refris.map(r=>`
          <div class="pdv-tier-opt" id="pdvRefri-${r.id}" onclick="selecionarRefri('${r.id}')">
            <div class="pdv-tier-radio"></div>
            <span class="pdv-tier-label">${r.nome}</span>
          </div>`).join("")}
      </div>
    </div>
    <div class="pdv-section-label">ADICIONAIS</div>
    <div class="pdv-adds-grid">
      ${ADICIONAIS.map(a=>`
        <div class="pdv-add-opt" id="pdvAdd-${a.id}" onclick="toggleAddPdv('${a.id}')">
          <div class="pdv-add-check" id="pdvChk-${a.id}"></div>
          <span class="pdv-add-nome">${a.nome}</span>
          <span class="pdv-add-preco">+R$&nbsp;${fmtN(a.preco)}</span>
        </div>`).join("")}
    </div>
    <div class="pdv-section-label">OBSERVAÇÃO</div>
    <textarea class="pdv-obs-input" id="pdvObs" rows="2"
      placeholder="Ex: sem cebola…"></textarea>
    <div style="height:8px"></div>`;

  atualizarTotalDrawer();
  atualizarConfirmarBurger();
  document.getElementById("pdvDrawerBody").scrollTop=0;
  document.getElementById("pdvDrawer").classList.add("open");
  document.getElementById("pdvOverlay").classList.add("open");
  document.body.style.overflow="hidden";
}

function selecionarPonto(pid){
  drawerPonto=pid;
  PONTOS.forEach(p=>{
    document.getElementById(`pdvPonto-${p.id}`)?.classList.toggle("selected",p.id===pid);
  });
  atualizarConfirmarBurger();
}

function selecionarRefri(rid){
  drawerRefri=rid;
  BEBIDAS.filter(r=>r.comboRefri).forEach(r=>{
    document.getElementById(`pdvRefri-${r.id}`)?.classList.toggle("selected",r.id===rid);
  });
  atualizarConfirmarBurger();
}

function fecharDrawerBurger(){
  document.getElementById("pdvDrawer").classList.remove("open");
  document.getElementById("pdvOverlay").classList.remove("open");
  document.body.style.overflow="";
}

function selecionarTier(idx){
  drawerTierIdx=idx;
  for(let i=0;i<3;i++)
    document.getElementById(`pdvTier-${i}`)?.classList.toggle("selected",i===idx);
  const refriSection=document.getElementById("pdvRefriSection");
  if(refriSection) refriSection.style.display=idx>0?"":"none";
  atualizarTotalDrawer();
  atualizarConfirmarBurger();
}

function atualizarConfirmarBurger(){
  const b=CARDAPIO.find(x=>x.id===drawerBurgerId);
  if(!b)return;
  const pontoOk=b.temPontoCarne===false||!!drawerPonto;
  const refriOk=drawerTierIdx===0||!!drawerRefri;
  document.getElementById("btnPdvConfirmar").disabled=!(pontoOk&&refriOk);
}

function toggleAddPdv(aid){
  drawerAdds.has(aid)?drawerAdds.delete(aid):drawerAdds.add(aid);
  const sel=drawerAdds.has(aid);
  document.getElementById(`pdvAdd-${aid}`)?.classList.toggle("selected",sel);
  const chk=document.getElementById(`pdvChk-${aid}`);
  if(chk) chk.textContent=sel?"✓":"";
  atualizarTotalDrawer();
}

function atualizarTotalDrawer(){
  const b=CARDAPIO.find(x=>x.id===drawerBurgerId);
  if(!b)return;
  const tierPrecos=[b.preco.burger,b.preco.combo,b.preco.completo];
  const addsTotal=[...drawerAdds].reduce((s,aid)=>{
    const a=ADICIONAIS.find(x=>x.id===aid);return s+(a?a.preco:0);
  },0);
  document.getElementById("pdvTotalItem").textContent=fmt(tierPrecos[drawerTierIdx]+addsTotal);
}

function confirmarBurger(){
  const b=CARDAPIO.find(x=>x.id===drawerBurgerId);
  const tierPrecos=[b.preco.burger,b.preco.combo,b.preco.completo];
  const tierLabels=["Só o burger","Burger + Refri lata","Burger + Refri + Batata P"];
  const adds=ADICIONAIS.filter(a=>drawerAdds.has(a.id));
  const addsTotal=adds.reduce((s,a)=>s+a.preco,0);
  const obs=document.getElementById("pdvObs")?.value.trim()||"";
  const segmentos=[tierLabels[drawerTierIdx]];
  if(drawerPonto) segmentos.push(`Ponto: ${PONTOS.find(p=>p.id===drawerPonto).label}`);
  if(drawerRefri) segmentos.push(`Refri: ${BEBIDAS.find(r=>r.id===drawerRefri).nome}`);
  const tier=segmentos.join(" · ");
  const preco=tierPrecos[drawerTierIdx]+addsTotal;

  pedido.push({
    uid:Date.now()+Math.random(),
    id:`burger-${b.id}-${drawerTierIdx}`,
    nome:b.nome,
    tier,       // string juntada com " · " — usada no render da tela
    tierSegs:segmentos,  // mesmos dados soltos — o cupom imprime um por linha
    adds,
    obs,
    preco,
    preco_total:preco,
    qty:1,
    _tipo:"burger"
  });

  fecharDrawerBurger();
  renderPedido();
  showToast(`${b.nome} adicionado ✓`);
}

function confirmarDrawerAtivo(){
  drawerMode==="combo" ? confirmarCombo() : confirmarBurger();
}

/* ═══════════════════════════════════════════
   🔥  DRAWER DE COMBO (reaproveita o drawer do burger)
   ═══════════════════════════════════════════ */
function abrirDrawerCombo(cid){
  drawerMode="combo";
  drawerComboId=cid;
  drawerComboPonto=null;
  const c=COMBOS.find(x=>x.id===cid);
  document.getElementById("pdvDrawerNome").textContent=c.nome;

  document.getElementById("pdvDrawerBody").innerHTML=`
    <div class="pdv-section-label">COMPOSIÇÃO</div>
    <div style="font-size:.8rem;color:var(--text2);margin-bottom:10px;">${c.detalhe}</div>
    <div class="pdv-section-label">PONTO DA CARNE</div>
    <div class="pdv-tier-row" id="pdvComboPontoRow">
      ${PONTOS.map(p=>`
        <div class="pdv-tier-opt" id="pdvComboPonto-${p.id}" onclick="selecionarPontoCombo('${p.id}')">
          <div class="pdv-tier-radio"></div>
          <span class="pdv-tier-label">${p.label}</span>
        </div>`).join("")}
    </div>
    <div class="pdv-section-label">OBSERVAÇÃO</div>
    <textarea class="pdv-obs-input" id="pdvComboObs" rows="2"
      placeholder="Ex: dividir o ponto entre as unidades…"></textarea>
    <div style="height:8px"></div>`;

  document.getElementById("pdvTotalItem").textContent=fmt(c.preco);
  document.getElementById("btnPdvConfirmar").disabled=true;
  document.getElementById("pdvDrawerBody").scrollTop=0;
  document.getElementById("pdvDrawer").classList.add("open");
  document.getElementById("pdvOverlay").classList.add("open");
  document.body.style.overflow="hidden";
}

function selecionarPontoCombo(pid){
  drawerComboPonto=pid;
  PONTOS.forEach(p=>{
    document.getElementById(`pdvComboPonto-${p.id}`)?.classList.toggle("selected",p.id===pid);
  });
  document.getElementById("btnPdvConfirmar").disabled=false;
}

function confirmarCombo(){
  const c=COMBOS.find(x=>x.id===drawerComboId);
  const pontoLabel=PONTOS.find(p=>p.id===drawerComboPonto).label;
  const obs=document.getElementById("pdvComboObs")?.value.trim()||"";

  pedido.push({
    uid:Date.now()+Math.random(),
    id:c.id,
    nome:c.nome,
    detalhe:c.detalhe,
    ponto:pontoLabel,
    obs,
    preco:c.preco,
    preco_total:c.preco,
    qty:1,
    _tipo:"combo"
  });

  fecharDrawerBurger();
  renderPedido();
  showToast(`${c.nome} adicionado ✓`);
}

/* ═══════════════════════════════════════════
   ➕  ADICIONAR ITENS SIMPLES (não-burger)
   ═══════════════════════════════════════════ */
function adicionarItem(item){
  const existe=pedido.find(p=>p.id===item.id&&!p._tipo);
  if(existe){
    existe.qty++;
    existe.preco_total=existe.preco*existe.qty;
  } else {
    pedido.push({
      uid:Date.now()+Math.random(),
      id:item.id,
      nome:item.nome,
      preco:item.preco,
      preco_total:item.preco,
      detalhe:item.detalhe||"",
      qty:1
    });
  }
  renderPedido();
  showToast(`${item.nome} ✓`);
}

function alterarQty(uid,delta){
  const item=pedido.find(p=>p.uid==uid);
  if(!item)return;
  item.qty+=delta;
  if(item.qty<=0){
    pedido=pedido.filter(p=>p.uid!=uid);
  } else {
    item.preco_total=item.preco*item.qty;
  }
  renderPedido();
}

function removerItem(uid){
  pedido=pedido.filter(p=>p.uid!=uid);
  renderPedido();
}

function novoPedido(){
  pedido=[];
  formaPagamento=null;
  entregaTipo=null;
  document.getElementById("clienteInput").value="";
  document.querySelectorAll(".btn-pill").forEach(b=>b.classList.remove("selected"));
  renderPedido();
}

/* ═══════════════════════════════════════════
   🛵  ENTREGA
   ═══════════════════════════════════════════ */
function selecionarEntrega(valor){
  entregaTipo=valor;
  document.querySelectorAll("#entregaRow .btn-pill").forEach(b=>{
    b.classList.toggle("selected",b.dataset.valor===valor);
  });
  atualizarBotoesImprimir();
}

/* ═══════════════════════════════════════════
   💳  FORMA DE PAGAMENTO
   ═══════════════════════════════════════════ */
function selecionarPagamento(forma){
  formaPagamento=forma;
  document.querySelectorAll("#pagamentoRow .btn-pill").forEach(b=>{
    b.classList.toggle("selected",b.dataset.forma===forma);
  });
  atualizarBotoesImprimir();
}

function atualizarBotoesImprimir(){
  const habilitado=pedido.length>0&&!!formaPagamento&&!!entregaTipo;
  document.getElementById("btnImprimirTop").disabled=!habilitado;
  document.getElementById("btnImprimirFooter").disabled=!habilitado;
}

/* ═══════════════════════════════════════════
   🧾  RENDER PEDIDO
   ═══════════════════════════════════════════ */
function renderPedido(){
  const container=document.getElementById("pedidoItems");
  const vazio=document.getElementById("pedidoVazio");
  const total=pedido.reduce((s,i)=>s+i.preco_total,0);

  atualizarBotoesImprimir();

  const qtdTotal=pedido.reduce((s,i)=>s+i.qty,0);
  document.getElementById("topbarTotal").textContent=fmt(total);
  document.getElementById("topbarCount").textContent=`${qtdTotal} ${qtdTotal===1?"ITEM":"ITENS"}`;
  document.getElementById("pedidoTotal").textContent=fmt(total);

  if(!pedido.length){
    container.innerHTML="";
    vazio&&container.appendChild(vazio);
    vazio&&(vazio.style.display="");
    document.getElementById("pedidoSubtotais").innerHTML="";
    return;
  }
  vazio&&(vazio.style.display="none");

  const frag=document.createDocumentFragment();
  pedido.forEach(item=>{
    const div=document.createElement("div");
    div.className="pedido-item";
    // linha de detalhe: tier para burgers, composição+ponto para combos, detalhe simples para o resto
    const detalheHtml=item._tipo==="burger"
      ?`<div class="pedido-item-detalhe">${item.tier}${item.adds?.length?" · +"+item.adds.map(a=>a.nome).join(", "):""}${item.obs?" · "+item.obs:""}</div>`
      :item._tipo==="combo"
        ?`<div class="pedido-item-detalhe">${item.detalhe} · Ponto: ${item.ponto}${item.obs?" · "+item.obs:""}</div>`
        :item.detalhe?`<div class="pedido-item-detalhe">${item.detalhe}</div>`:"";
    div.innerHTML=`
      <div class="pedido-item-info">
        <div class="pedido-item-nome">${item.nome}${item.qty>1?` ×${item.qty}`:""}</div>
        ${detalheHtml}
        <div class="qty-ctrl">
          <button class="btn-qty" onclick="alterarQty(${item.uid},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="btn-qty" onclick="alterarQty(${item.uid},1)">+</button>
        </div>
      </div>
      <div class="pedido-item-preco">${fmt(item.preco_total)}</div>
      <button class="btn-rem" onclick="removerItem(${item.uid})">✕</button>`;
    frag.appendChild(div);
  });
  container.innerHTML="";
  container.appendChild(frag);

  const sub=document.getElementById("pedidoSubtotais");
  const cats={burgers:0,combos:0,petiscos:0,bebidas:0,outros:0};
  pedido.forEach(i=>{
    if(i.id.startsWith("burger"))cats.burgers+=i.preco_total;
    else if(COMBOS.some(c=>c.id===i.id))cats.combos+=i.preco_total;
    else if(i.id.startsWith("bf")||i.id.startsWith("bt")||i.id.startsWith("aq"))cats.petiscos+=i.preco_total;
    else if(BEBIDAS.some(b=>b.id===i.id))cats.bebidas+=i.preco_total;
    else cats.outros+=i.preco_total;
  });
  sub.innerHTML=Object.entries(cats)
    .filter(([,v])=>v>0)
    .map(([k,v])=>`
      <div class="pedido-linha">
        <span>${{burgers:"🍔 Burgers",combos:"🔥 Combos",petiscos:"🍟 Petiscos",bebidas:"🥤 Bebidas",outros:"➕ Outros"}[k]}</span>
        <span>R$ ${fmtN(v)}</span>
      </div>`).join("");
}

/* ═══════════════════════════════════════════
   🖨️  IMPRESSÃO — cupom de 32 colunas (bobina 58mm)
   ═══════════════════════════════════════════ */

/* Tem que bater com --receipt-width no style.css:
   48mm úteis / (0.6em × 2.5mm) = 32 colunas. */
const RECEIPT_COLS=32;
const REGUA="-".repeat(RECEIPT_COLS);

/* O cupom virou HTML (por causa do bold no nome do item), então tudo que é
   texto livre digitado pelo atendente — observação e nome do cliente —
   precisa ser escapado. A observação é um <textarea>: um "<" digitado ali
   corromperia o cupom inteiro se fosse direto pro innerHTML. */
function escHtml(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function centro(texto){
  const pad=Math.max(0,Math.floor((RECEIPT_COLS-texto.length)/2));
  return " ".repeat(pad)+texto;
}

/* Quebra manual preservando o recuo. O pre-wrap do CSS também quebraria, mas
   perderia o recuo na continuação — e aí o "+" dos adicionais deixaria de
   parecer atrelado ao item de cima. O split em \s+ também normaliza as
   quebras de linha que o atendente digita no textarea de observação. */
function quebra(texto,largura=RECEIPT_COLS,recuo=""){
  const linhas=[];
  let linha=recuo;
  for(const palavra of String(texto).split(/\s+/)){
    if(!palavra) continue;
    const cand=linha.trim()?`${linha} ${palavra}`:recuo+palavra;
    if(cand.length>largura&&linha.trim()){
      linhas.push(linha);
      linha=recuo+palavra;
    }else{
      linha=cand;
    }
  }
  if(linha.trim()) linhas.push(linha);
  return linhas;
}

/* Coluna de preço fixa: o preço fica SEMPRE alinhado à direita na primeira
   linha do item, e o nome quebra por baixo. Assim o preço cai sempre na mesma
   coluna, dá pra conferir a conta descendo o olho numa linha só.
   Nome nunca é abreviado — a cozinha lê sob pressão e nome truncado cria
   ambiguidade real entre combos parecidos. */
function linhasItem(label,preco){
  const p=`R$ ${fmtN(preco)}`;
  const nomeW=RECEIPT_COLS-p.length-1;
  const ls=quebra(label,nomeW);
  // palavra única maior que a coluna do nome: preço desce pra linha própria
  if(!ls.length||ls[0].length>nomeW) return [...ls,p.padStart(RECEIPT_COLS)];
  return [ls[0].padEnd(nomeW)+" "+p,...ls.slice(1)];
}

function gerarCupom(){
  const cliente=document.getElementById("clienteInput").value.trim();
  const agora=new Date();
  const dia=agora.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit",month:"2-digit"});
  const hora=agora.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});

  /* Cada linha é {t:texto, b:bold}. Bold = nome do item e observação; o resto
     (composição, ponto, adicionais) fica em peso normal, criando a hierarquia
     que separa "o que é" de "como é". A observação é bold porque é a instrução
     de exceção: perder um "sem cebola" custa o pedido refeito. */
  const L=[];
  const add=(t,b=false)=>L.push({t,b});
  const detalhe=(txt,recuo="  ")=>quebra(txt,RECEIPT_COLS,recuo).forEach(l=>add(l));
  const item=(label,preco)=>linhasItem(label,preco).forEach(l=>add(l,true));
  const obs=txt=>quebra(`Obs: ${txt}`,RECEIPT_COLS,"  ").forEach(l=>add(l,true));

  add(centro("DESMANTELO'S BURGUER"),true);
  add(centro("Hamburguer Artesanal na Brasa"));
  add(centro("(81) 9.8669-0346"));
  add(REGUA);
  add(`${dia}  ${hora}`);
  if(cliente) detalhe(`Cliente: ${cliente}`,"");
  const entregaLabel={delivery:"Delivery",retirada:"Retirada"}[entregaTipo]||"";
  if(entregaLabel) add(`Entrega: ${entregaLabel}`);
  add(REGUA);

  pedido.forEach(i=>{
    const qtd=i.qty>1?`${i.qty}x `:"";
    if(i._tipo==="burger"){
      // nome + preço; as escolhas (tamanho, ponto, refri) descem em linhas
      // próprias indentadas — mesmo padrão do combo, pra cozinha achar o ponto
      item(`${qtd}${i.nome}`,i.preco_total);
      const segs=i.tierSegs||(i.tier?i.tier.split(" · "):[]);
      segs.forEach(s=>detalhe(s));
      // adicionais atrelados
      if(i.adds?.length) detalhe(`+ ${i.adds.map(a=>a.nome).join(", ")}`);
      if(i.obs) obs(i.obs);
    } else if(i._tipo==="combo"){
      // combo tem burger na composição — cozinha precisa saber o quê preparar e o ponto
      item(`${qtd}${i.nome}`,i.preco_total);
      detalhe(i.detalhe);
      detalhe(`Ponto: ${i.ponto}`);
      if(i.obs) obs(i.obs);
    } else {
      item(`${qtd}${i.nome}`,i.preco_total);
      // remove detalhe do cupom para não-burgers/combos (desnecessário na cozinha)
    }
  });

  const total=pedido.reduce((s,i)=>s+i.preco_total,0);
  add(REGUA);
  item("TOTAL",total);
  const pagLabel={dinheiro:"Dinheiro",pix:"Pix",cartao:"Cartão"}[formaPagamento]||"";
  if(pagLabel) add(`Pagamento: ${pagLabel}`);
  add(REGUA);
  add(centro("Obrigado!"));
  add(centro("@desmantelosburguer"));

  return L.map(o=>o.b?`<b>${escHtml(o.t)}</b>`:escHtml(o.t)).join("\n");
}

function imprimirCupom(){
  if(!pedido.length||!formaPagamento)return;
  // innerHTML (não textContent) porque o cupom carrega <b> no nome do item;
  // todo texto livre já vai escapado por escHtml() dentro de gerarCupom()
  document.getElementById("printArea").innerHTML=gerarCupom();
  window.print();
}

/* ═══════════════════════════════════════════
   🍞  TOAST
   ═══════════════════════════════════════════ */
let toastTimer;
function showToast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg;t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove("show"),1800);
}

/* INIT */
renderAbas();
renderProdutos();
renderPedido();

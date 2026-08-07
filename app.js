      /* ═══════════════════════════════════════
   ⚙️  CONFIGURAÇÃO
   ═══════════════════════════════════════ */
      const WHATSAPP = "5581986690346";

      // Dados vêm de cardapio.js (fonte única, compartilhada com o PDV
      // e com o script de sync com o Google) — ver PRD-cardapio-google-sync.md
      const ADICIONAIS = CARDAPIO_DATA.adicionais;
      const CARDAPIO = CARDAPIO_DATA.burgers;
      const SANDUICHES = CARDAPIO_DATA.sanduiches;
      const COMBOS = CARDAPIO_DATA.combos;
      const BATATAS = CARDAPIO_DATA.batatas;
      const BEBIDAS = CARDAPIO_DATA.bebidas;

      /* ═══════════════════════════════════════
   🏷️  BADGES
   ═══════════════════════════════════════ */
      const BADGE_MAP = {
        novidade: { cls: "badge-novidade", txt: "💥 NOVIDADE" },
        vendido: { cls: "badge-vendido", txt: "🔥 MAIS VENDIDO" },
        favorito: { cls: "badge-favorito", txt: "⭐ FAVORITO DA CASA" },
        recheado: { cls: "badge-recheado", txt: "🥓 MAIS RECHEADO" },
        recomendado: { cls: "badge-recomendado", txt: "👑 RECOMENDADO" },
      };

      function badgeHTML(badge) {
        if (!badge || !BADGE_MAP[badge]) return "";
        const b = BADGE_MAP[badge];
        return `<span class="card-badge ${b.cls}">${b.txt}</span>`;
      }

      /* ═══════════════════════════════════════
   🛒  ESTADO
   ═══════════════════════════════════════ */
      let cart = [];
      let entregaTipo = null;
      let formaPagamento = null;
      const ENTREGA_LABELS = { delivery: "Delivery", retirada: "Retirada" };
      const PAGAMENTO_LABELS = { dinheiro: "Dinheiro", pix: "Pix", cartao: "Cartão" };
      let custOrigem = "burgers";
      let custItemId = null;
      let custTierIdx = 0;
      let custAdds = new Set();
      let custPonto = null;
      let custRefri = null;
      const PONTOS = [
        { id: "mal-passada", label: "Mal passada" },
        { id: "ao-ponto", label: "Ao ponto" },
        { id: "bem-passada", label: "Bem passada" },
      ];
      const REFRIS = [
        { id: "coca", label: "Coca Lata" },
        { id: "coca-zero", label: "Coca Zero Lata" },
        { id: "guarana", label: "Guaraná Lata" },
        { id: "guarana-zero", label: "Guaraná Zero Lata" },
        { id: "fanta", label: "Fanta Lata" },
        { id: "sprite", label: "Sprite Lata" },
        { id: "sprite-zero", label: "Sprite Zero Lata" },
        { id: "h2o", label: "H2O Lata" },
      ];
      const batataSel = {};
      const bebidaQtd = {}; // {bid: quantidade} — estado independente do cart

      /* ═══════════════════════════════════════
   🖼️  RENDERS
   ═══════════════════════════════════════ */
      function fmt(v) {
        return v.toFixed(2).replace(".", ",");
      }

      // origem → array: mesmo padrão usado no resto do arquivo pra achar de onde um item veio
      // (CARDAPIO = "burgers", SANDUICHES = "sanduiches") — usado pelo drawer de personalização
      // pra funcionar com qualquer um dos dois, não só hambúrguer.
      function itemArray(origem) {
        return origem === "sanduiches" ? SANDUICHES : CARDAPIO;
      }
      function findItem(origem, id) {
        return itemArray(origem).find((x) => x.id == id);
      }

      // Card tiered (3 preços) compartilhado entre Hambúrgueres e Sanduíches — a única
      // diferença de comportamento por seção é o carregamento eager/lazy da imagem
      // (só a seção acima da dobra, "burgers", tem o 1º/2º card priorizados).
      function renderItemsTiered(arr, origem, containerId, eagerLoad) {
        const frag = document.createDocumentFragment();
        arr.forEach((b, i) => {
          const art = document.createElement("article");
          art.className = "burger-card";
          art.setAttribute("role", "button");
          art.setAttribute("tabindex", "0");
          art.onclick = () => openCust(origem, b.id);
          art.onkeydown = (e) => {
            if (e.key === "Enter" || e.key === " ") openCust(origem, b.id);
          };
          const imgLoadAttrs = !eagerLoad
            ? `loading="lazy"`
            : i === 0
              ? `fetchpriority="high"`
              : i === 1
                ? ""
                : `loading="lazy"`;
          art.innerHTML = `
      <div class="card-img">
        ${
          b.imagem
            ? `<img src="${b.imagem}" srcset="${b.imagem.replace(".webp", "-1x.webp")} 1x, ${b.imagem} 2x" alt="${b.nome}" ${imgLoadAttrs} decoding="async"/>`
            : `<div class="card-img-placeholder"><span>🍔</span><span>FOTO EM BREVE</span></div>`
        }
        ${badgeHTML(b.badge)}
      </div>
      <div class="card-info">
        <div class="card-info-top">
          <div class="burger-name">${b.nome}</div>
          <div class="burger-desc">${b.descricao}</div>
        </div>
        <div class="card-bottom">
          <div>
            <span class="burger-price-from">a partir de</span>
            <span class="burger-price">R$&nbsp;${fmt(b.preco.burger)}</span>
          </div>
          <button class="btn-add-card" onclick="event.stopPropagation();openCust('${origem}','${b.id}')">
            + PEDIR
          </button>
        </div>
      </div>`;
          frag.appendChild(art);
        });
        document.getElementById(containerId).appendChild(frag);
      }

      function renderBurgers() {
        renderItemsTiered(CARDAPIO, "burgers", "menu-burgers", true);
      }
      function renderSanduiches() {
        renderItemsTiered(SANDUICHES, "sanduiches", "menu-sanduiches", false);
      }

      const comboPontoSel = {};

      function renderCombos() {
        const frag = document.createDocumentFragment();
        COMBOS.forEach((c) => {
          const div = document.createElement("div");
          div.className = "combo-card";
          div.innerHTML = `
      <div class="combo-header">
        <div class="combo-name">${c.emoji} ${c.nome}</div>
        <div class="combo-price">R$&nbsp;${fmt(c.preco)}</div>
      </div>
      <div class="combo-body">
        <p class="combo-desc">${c.descricao}</p>
        <div class="combo-itens">${c.itens.map((i) => `<span class="combo-tag">✔ ${i}</span>`).join("")}</div>
        <div class="cust-section-label">PONTO DA CARNE</div>
        <div class="tier-row" id="comboPontoRow-${c.id}">
          ${PONTOS.map(
            (p) => `
            <div class="tier-opt" onclick="selectComboPonto('${c.id}','${p.id}')" id="comboPonto-${c.id}-${p.id}">
              <div class="tier-radio"><div class="tier-radio-dot"></div></div>
              <div class="tier-opt-info">
                <div class="tier-opt-label">${p.label}</div>
              </div>
            </div>`,
          ).join("")}
        </div>
        <textarea class="obs-input" id="comboObs-${c.id}" rows="1" placeholder="Observação (opcional)"></textarea>
        <button class="btn-pedir-combo" id="btnCombo-${c.id}" onclick="addCombo('${c.id}')" disabled>🔥 ADICIONAR AO PEDIDO</button>
      </div>`;
          frag.appendChild(div);
        });
        document.getElementById("menu-combos").appendChild(frag);
      }

      function selectComboPonto(cid, pid) {
        comboPontoSel[cid] = pid;
        document.getElementById(`comboPontoRow-${cid}`)?.classList.remove("invalid");
        PONTOS.forEach((p) => {
          document
            .getElementById(`comboPonto-${cid}-${p.id}`)
            ?.classList.toggle("selected", p.id === pid);
        });
        document.getElementById(`btnCombo-${cid}`).disabled = false;
      }

      function renderBatatas() {
        const frag = document.createDocumentFragment();
        BATATAS.forEach((b) => {
          batataSel[b.id] = b.tamanhos[0];
          const art = document.createElement("article");
          art.className = "burger-card petisco-card";
          art.innerHTML = `
      <div class="card-img">
        ${
          b.imagem
            ? `<img src="${b.imagem}" srcset="${b.imagem.replace(".webp", "-1x.webp")} 1x, ${b.imagem} 2x" alt="${b.nome}" loading="lazy" decoding="async"/>`
            : `<div class="card-img-placeholder"><span>${b.emoji}</span><span>FOTO EM BREVE</span></div>`
        }
      </div>
      <div class="card-info">
        <div class="card-info-top">
          <div class="burger-name">${b.emoji} ${b.nome}</div>
          <div class="burger-desc">${b.desc}</div>
        </div>
        <div class="batata-tamanhos" id="tam-${b.id}">
          ${b.tamanhos
            .map(
              (t, i) => `
            <button class="tam-btn${i === 0 ? " selected" : ""}" onclick="selectTam('${b.id}',${i})" id="tam-${b.id}-${i}">
              ${t.label}<span class="tam-label">R$&nbsp;${fmt(t.preco)}</span>
            </button>`,
            )
            .join("")}
        </div>
        <button class="btn-pedir-bat" onclick="addBatata('${b.id}')">+ ADICIONAR</button>
      </div>`;
          frag.appendChild(art);
        });
        document.getElementById("menu-batatas").appendChild(frag);
      }

      /* ═══════════════════════════════════════
   🎛️  DRAWER CUSTOMIZAÇÃO
   ═══════════════════════════════════════ */
      // Rótulos do tier são gerados a partir de `substantivo` (default "burger") — assim
      // o mesmo drawer serve pra hambúrguer ("SÓ O BURGER") e pra baguete ("SÓ O BAGUETE")
      // sem precisar de HTML/lógica duplicada por tipo de produto.
      function tierDefs(b) {
        const subst = b.substantivo || "burger";
        const Subst = subst.charAt(0).toUpperCase() + subst.slice(1);
        return [
          { label: `SÓ O ${subst.toUpperCase()}`, desc: `Só o ${subst}`, preco: b.preco.burger },
          { label: `${subst.toUpperCase()} + REFRI`, desc: `${Subst} + Refrigerante lata`, preco: b.preco.combo },
          { label: "COMBO COMPLETO", desc: `${Subst} + Refri lata + Batata Frita P`, preco: b.preco.completo },
        ];
      }

      function openCust(origem, id) {
        custOrigem = origem;
        custItemId = id;
        custTierIdx = 0;
        custAdds = new Set();
        custPonto = null;
        custRefri = null;
        const b = findItem(origem, id);
        const temPonto = b.temPontoCarne !== false;

        // header
        const imgEl = document.getElementById("custImg");
        imgEl.innerHTML = b.imagem
          ? `<img src="${b.imagem}" srcset="${b.imagem.replace(".webp", "-1x.webp")} 1x, ${b.imagem} 2x" alt="${b.nome}" loading="lazy" decoding="async"/>`
          : `🍔`;
        document.getElementById("custName").textContent = b.nome;
        document.getElementById("custDesc").textContent = b.descricao;

        // body
        document.getElementById("custBody").innerHTML = `
    <div class="cust-section-label">ESCOLHA O COMBO</div>
    <div class="tier-row" id="tierRow">
      ${tierDefs(b)
        .map(
          (t, i) => `
        <div class="tier-opt${i === 0 ? " selected" : ""}" onclick="selectCustTier(${i})" id="custTier-${i}">
          <div class="tier-radio"><div class="tier-radio-dot"></div></div>
          <div class="tier-opt-info">
            <div class="tier-opt-label">${t.label}</div>
            <div class="tier-opt-desc">${t.desc}</div>
          </div>
          <div class="tier-opt-price">R$&nbsp;${fmt(t.preco)}</div>
        </div>`,
        )
        .join("")}
    </div>

    <div class="cust-section-label" id="refriLabel" style="display:none">REFRIGERANTE</div>
    <div class="tier-row" id="refriRow" style="display:none">
      ${REFRIS.map(
        (r) => `
        <div class="tier-opt" onclick="selectCustRefri('${r.id}')" id="custRefri-${r.id}">
          <div class="tier-radio"><div class="tier-radio-dot"></div></div>
          <div class="tier-opt-info">
            <div class="tier-opt-label">${r.label}</div>
          </div>
        </div>`,
      ).join("")}
    </div>

    ${
      temPonto
        ? `
    <div class="cust-section-label">PONTO DA CARNE</div>
    <div class="tier-row" id="pontoRow">
      ${PONTOS.map(
        (p) => `
        <div class="tier-opt" onclick="selectCustPonto('${p.id}')" id="custPonto-${p.id}">
          <div class="tier-radio"><div class="tier-radio-dot"></div></div>
          <div class="tier-opt-info">
            <div class="tier-opt-label">${p.label}</div>
          </div>
        </div>`,
      ).join("")}
    </div>`
        : ""
    }

    <div class="cust-section-label">ADICIONAIS</div>
    <div class="adds-grid">
      ${ADICIONAIS.map(
        (a) => `
        <div class="add-opt" onclick="toggleAdd('${a.id}')" id="addopt-${origem}-${id}-${a.id}">
          <div class="add-check" id="addcheck-${origem}-${id}-${a.id}"></div>
          <span class="add-nome">${a.nome}</span>
          <span class="add-price">+R$&nbsp;${fmt(a.preco)}</span>
        </div>`,
      ).join("")}
    </div>

    <div class="cust-section-label">OBSERVAÇÕES</div>
    <textarea class="obs-input" id="custObs" rows="2" placeholder="Ex: sem cebola, sem tomate…"></textarea>
    <div style="height:8px"></div>`;

        updateCustTotal();
        document.getElementById("custBody").scrollTop = 0;
        document.getElementById("custDrawer").classList.add("open");
        document.getElementById("custOverlay").classList.add("open");
        document.body.style.overflow = "hidden";

        trackEvent("item_view", b.nome, origem === "sanduiches" ? "sanduiche" : "burger");
      }

      function closeCust() {
        document.getElementById("custDrawer").classList.remove("open");
        document.getElementById("custOverlay").classList.remove("open");
        document.body.style.overflow = "";
      }

      function selectCustTier(idx) {
        custTierIdx = idx;
        for (let i = 0; i < 3; i++) {
          document
            .getElementById(`custTier-${i}`)
            ?.classList.toggle("selected", i === idx);
        }
        const incluiRefri = idx > 0;
        const refriLabel = document.getElementById("refriLabel");
        const refriRow = document.getElementById("refriRow");
        if (refriLabel) refriLabel.style.display = incluiRefri ? "" : "none";
        if (refriRow) refriRow.style.display = incluiRefri ? "" : "none";
        updateCustTotal();
      }

      function selectCustPonto(pid) {
        custPonto = pid;
        document.getElementById("pontoRow")?.classList.remove("invalid");
        PONTOS.forEach((p) => {
          document
            .getElementById(`custPonto-${p.id}`)
            ?.classList.toggle("selected", p.id === pid);
        });
      }

      function selectCustRefri(rid) {
        custRefri = rid;
        document.getElementById("refriRow")?.classList.remove("invalid");
        REFRIS.forEach((r) => {
          document
            .getElementById(`custRefri-${r.id}`)
            ?.classList.toggle("selected", r.id === rid);
        });
      }

      function toggleAdd(aid) {
        if (custAdds.has(aid)) custAdds.delete(aid);
        else custAdds.add(aid);
        const opt = document.getElementById(`addopt-${custOrigem}-${custItemId}-${aid}`);
        const chk = document.getElementById(`addcheck-${custOrigem}-${custItemId}-${aid}`);
        const sel = custAdds.has(aid);
        opt?.classList.toggle("selected", sel);
        if (chk) chk.textContent = sel ? "✓" : "";
        updateCustTotal();
      }

      function updateCustTotal() {
        const b = findItem(custOrigem, custItemId);
        if (!b) return;
        const tierPrecos = [b.preco.burger, b.preco.combo, b.preco.completo];
        const addsTotal = [...custAdds].reduce((s, aid) => {
          const a = ADICIONAIS.find((x) => x.id === aid);
          return s + (a ? a.preco : 0);
        }, 0);
        const total = tierPrecos[custTierIdx] + addsTotal;
        document.getElementById("custTotal").textContent = `R$ ${fmt(total)}`;
      }

      // Reflow+shake (já existia por classe) + agora também rola até o campo,
      // reaproveitado pra ponto da carne e refrigerante.
      function flagInvalid(el) {
        if (!el) return;
        el.classList.remove("invalid");
        void el.offsetWidth;
        el.classList.add("invalid");
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      function confirmCust() {
        const b = findItem(custOrigem, custItemId);
        const temPonto = b.temPontoCarne !== false;
        const incluiRefri = custTierIdx > 0;
        if (incluiRefri && !custRefri) {
          flagInvalid(document.getElementById("refriRow"));
          showToast("Escolha o sabor do refrigerante! 🥤");
          return;
        }
        if (temPonto && !custPonto) {
          flagInvalid(document.getElementById("pontoRow"));
          showToast("Escolha o ponto da carne! 🥩");
          return;
        }
        const tierPrecos = [b.preco.burger, b.preco.combo, b.preco.completo];
        const tierNomes = tierDefs(b).map((t) =>
          t.desc.charAt(0).toUpperCase() + t.desc.slice(1),
        );
        const adds = ADICIONAIS.filter((a) => custAdds.has(a.id));
        const addsTotal = adds.reduce((s, a) => s + a.preco, 0);
        const obs = document.getElementById("custObs")?.value.trim() || "";
        const tierNome = tierNomes[custTierIdx];
        const refriLabel = incluiRefri
          ? REFRIS.find((r) => r.id === custRefri).label
          : null;
        const pontoLabel = temPonto
          ? PONTOS.find((p) => p.id === custPonto).label
          : null;
        const detalheParts = [
          tierNome !== tierNomes[0] ? tierNome : null,
          refriLabel ? `Refri: ${refriLabel}` : null,
          pontoLabel ? `Ponto: ${pontoLabel}` : null,
          adds.length
            ? `Adicionais: ${adds.map((a) => a.nome).join(", ")}`
            : null,
        ].filter(Boolean);
        const categoria = custOrigem === "sanduiches" ? "sanduiche" : "burger";
        cart.push({
          id: Date.now(),
          nome: b.nome,
          preco: tierPrecos[custTierIdx] + addsTotal,
          detalhe: detalheParts.join(" · "),
          obs,
          adds,
          qtd: 1,
          categoria,
        });
        closeCust();
        updateCartUI();
        showToast(`${b.nome} adicionado! 🔥`);
        trackEvent("item_add", b.nome, categoria);
      }

      /* ═══════════════════════════════════════
   ➕  ADD ITENS SIMPLES
   ═══════════════════════════════════════ */
      function selectTam(batId, idx) {
        const bat = BATATAS.find((b) => b.id === batId);
        batataSel[batId] = bat.tamanhos[idx];
        bat.tamanhos.forEach((_, i) => {
          document
            .getElementById(`tam-${batId}-${i}`)
            ?.classList.toggle("selected", i === idx);
        });
      }
      function addBatata(bid) {
        const b = BATATAS.find((x) => x.id === bid);
        const tam = batataSel[bid];
        cart.push({
          id: Date.now(),
          nome: `${b.nome} (${tam.label})`,
          preco: tam.preco,
          detalhe: "",
          obs: "",
          adds: [],
          qtd: 1,
          categoria: "petisco",
        });
        updateCartUI();
        showToast(`${b.nome} ${tam.label} adicionada! 🍟`);
        trackEvent("item_add", b.nome, "petisco");
      }
      function addCombo(cid) {
        const c = COMBOS.find((x) => x.id === cid);
        const pontoId = comboPontoSel[cid];
        if (!pontoId) return; // botão fica disabled até escolher, guarda extra
        const pontoLabel = PONTOS.find((p) => p.id === pontoId).label;
        const obs = document.getElementById(`comboObs-${cid}`)?.value.trim() || "";
        cart.push({
          id: Date.now(),
          nome: c.nome,
          preco: c.preco,
          detalhe: `${c.itens.join(" + ")} · Ponto: ${pontoLabel}`,
          obs,
          adds: [],
          qtd: 1,
          categoria: "combo",
        });
        updateCartUI();
        showToast(`${c.nome} adicionado! 🔥`);
        trackEvent("item_add", c.nome, "combo");
      }
      function renderBebidas() {
        const frag = document.createDocumentFragment();
        BEBIDAS.forEach((b) => {
          bebidaQtd[b.id] = 0;
          const div = document.createElement("div");
          div.className = "bebida-row";
          div.id = `brow-${b.id}`;
          div.innerHTML = `
      <span class="bebida-row-icon">${b.emoji}</span>
      <div class="bebida-row-info">
        <div class="bebida-row-nome">${b.nome}</div>
        <div class="bebida-row-preco">R$&nbsp;${fmt(b.preco)}</div>
      </div>
      <button class="btn-beb-add" id="beb-add-${b.id}" onclick="bebidaIncrement('${b.id}')">+&nbsp;ADD</button>
      <div class="beb-qty-ctrl" id="beb-ctrl-${b.id}" style="display:none">
        <button class="btn-beb-dec" onclick="bebidaDecrement('${b.id}')">−</button>
        <span class="beb-qty-num" id="beb-num-${b.id}">0</span>
        <button class="btn-beb-inc" onclick="bebidaIncrement('${b.id}')">+</button>
      </div>`;
          frag.appendChild(div);
        });
        document.getElementById("menu-bebidas").appendChild(frag);
      }

      function bebidaIncrement(bid) {
        bebidaQtd[bid] = (bebidaQtd[bid] || 0) + 1;
        atualizarBebidaUI(bid);
        syncBebidaCart(bid);
        const b = BEBIDAS.find((x) => x.id === bid);
        showToast(`${b.nome} adicionado! 🥤`);
        trackEvent("item_add", b.nome, "bebida");
      }

      function bebidaDecrement(bid) {
        if (!bebidaQtd[bid]) return;
        bebidaQtd[bid]--;
        atualizarBebidaUI(bid);
        syncBebidaCart(bid);
      }

      function atualizarBebidaUI(bid) {
        const qty = bebidaQtd[bid] || 0;
        const row = document.getElementById(`brow-${bid}`);
        const addBtn = document.getElementById(`beb-add-${bid}`);
        const ctrl = document.getElementById(`beb-ctrl-${bid}`);
        const num = document.getElementById(`beb-num-${bid}`);
        if (qty === 0) {
          addBtn.style.display = "";
          ctrl.style.display = "none";
          row?.classList.remove("has-qty");
        } else {
          addBtn.style.display = "none";
          ctrl.style.display = "flex";
          num.textContent = qty;
          row?.classList.add("has-qty");
        }
      }

      function syncBebidaCart(bid) {
        // remove entradas anteriores desta bebida do cart
        cart = cart.filter((i) => i.bebidaId !== bid);
        const qty = bebidaQtd[bid] || 0;
        if (qty > 0) {
          const b = BEBIDAS.find((x) => x.id === bid);
          cart.push({
            id: `beb-${bid}`,
            bebidaId: bid,
            nome: `${b.nome}${qty > 1 ? ` ×${qty}` : ""}`,
            preco: b.preco * qty,
            detalhe: "",
            obs: "",
            adds: [],
            _qtdLabel: qty > 1 ? ` ×${qty}` : "",
            categoria: "bebida",
          });
        }
        updateCartUI();
      }

      /* ═══════════════════════════════════════
   🗑️  REMOVER
   ═══════════════════════════════════════ */
      function removeItem(iid) {
        const item = cart.find((i) => i.id == iid);
        // se for bebida, resetar qtd e UI
        if (item?.bebidaId) {
          bebidaQtd[item.bebidaId] = 0;
          atualizarBebidaUI(item.bebidaId);
        }
        cart = cart.filter((i) => i.id != iid);
        updateCartUI();
        renderDrawer();
        if (!cart.length) closeDrawer();
      }

      // Stepper genérico do drawer de revisão — bebida tem seu próprio mecanismo
      // (bebidaQtd, na lista de bebidas) e não passa por aqui.
      function incrementQtd(itemId) {
        const item = cart.find((i) => i.id == itemId);
        if (!item || item.bebidaId) return;
        item.qtd = (item.qtd || 1) + 1;
        updateCartUI();
        renderDrawer();
      }
      function decrementQtd(itemId) {
        const item = cart.find((i) => i.id == itemId);
        if (!item || item.bebidaId) return;
        const nova = (item.qtd || 1) - 1;
        if (nova <= 0) {
          removeItem(itemId);
          return;
        }
        item.qtd = nova;
        updateCartUI();
        renderDrawer();
      }

      /* ═══════════════════════════════════════
   🔄  CART UI
   ═══════════════════════════════════════ */
      function calcTotal() {
        return cart.reduce((s, i) => s + i.preco * (i.qtd || 1), 0);
      }
      function updateCartUI() {
        const fl = document.getElementById("cartFloat");
        if (!cart.length) {
          fl.classList.remove("visible");
          return;
        }
        fl.classList.add("visible");
        const totalUnidades = cart.reduce((s, i) => s + (i.qtd || 1), 0);
        document.getElementById("cartBadge").textContent = totalUnidades;
        document.getElementById("cartCount").textContent =
          `${totalUnidades} ${totalUnidades === 1 ? "ITEM" : "ITENS"}`;
        document.getElementById("cartItemsList").textContent = cart
          .map((i) => (i.qtd > 1 ? `${i.nome} ×${i.qtd}` : i.nome))
          .join(" · ");
        document.getElementById("cartTotal").textContent =
          `R$ ${fmt(calcTotal())}`;
      }
      function clearCart() {
        // resetar qtd e UI de todas as bebidas
        BEBIDAS.forEach((b) => {
          bebidaQtd[b.id] = 0;
          atualizarBebidaUI(b.id);
        });
        cart = [];
        updateCartUI();
        closeDrawer();
      }

      // Reset completo depois que um pedido é enviado — diferente de clearCart()
      // (botão "limpar tudo", só mexe no carrinho), aqui também zera nome/entrega/
      // pagamento pra deixar o site pronto pro próximo pedido, sem dar reload.
      function resetPedidoForm() {
        clearCart();
        const nomeInput = document.getElementById("clienteNome");
        if (nomeInput) nomeInput.value = "";
        entregaTipo = null;
        formaPagamento = null;
        document
          .querySelectorAll("#entregaRow .pill-opt")
          .forEach((b) => b.classList.remove("selected"));
        document
          .querySelectorAll("#pagamentoRow .pill-opt")
          .forEach((b) => b.classList.remove("selected"));
      }

      /* ═══════════════════════════════════════
   🗂️  DRAWER PEDIDO
   ═══════════════════════════════════════ */
      function renderDrawer() {
        const body = document.getElementById("drawerBody");
        if (!cart.length) {
          body.innerHTML =
            "<p style='text-align:center;padding:20px;color:#888;font-size:.83rem'>Nenhum item ainda.</p>";
          return;
        }
        body.innerHTML = cart
          .map(
            (i) => `
    <div class="order-item">
      <button class="btn-remove" onclick="removeItem(${i.id})">✕</button>
      <div class="order-item-info">
        <div class="order-item-name">${i.nome}</div>
        ${i.detalhe ? `<div class="order-item-adds">➕ ${i.detalhe}</div>` : ""}
        ${i.obs ? `<div class="order-item-obs">📝 ${i.obs}</div>` : ""}
      </div>
      <div class="order-item-right">
        ${
          i.bebidaId
            ? ""
            : `<div class="beb-qty-ctrl">
          <button class="btn-beb-dec" onclick="decrementQtd(${i.id})">−</button>
          <span class="beb-qty-num">${i.qtd || 1}</span>
          <button class="btn-beb-inc" onclick="incrementQtd(${i.id})">+</button>
        </div>`
        }
        <div class="order-item-price">R$&nbsp;${fmt(i.preco * (i.qtd || 1))}</div>
      </div>
    </div>`,
          )
          .join("");
        document.getElementById("drawerTotal").textContent =
          `Total: R$ ${fmt(calcTotal())}`;
      }
      function openDrawer() {
        renderDrawer();
        document.getElementById("drawer").classList.add("open");
        document.getElementById("drawerOverlay").classList.add("open");
        document.body.style.overflow = "hidden";
      }
      function closeDrawer() {
        document.getElementById("drawer").classList.remove("open");
        document.getElementById("drawerOverlay").classList.remove("open");
        document.body.style.overflow = "";
      }
      document
        .getElementById("btnVerPedido")
        .addEventListener("click", openDrawer);

      /* ═══════════════════════════════════════
   📲  WHATSAPP
   ═══════════════════════════════════════ */
      function selecionarEntrega(valor) {
        entregaTipo = valor;
        document.getElementById("entregaRow")?.classList.remove("invalid");
        document.querySelectorAll("#entregaRow .pill-opt").forEach((b) => {
          b.classList.toggle("selected", b.dataset.valor === valor);
        });
      }

      function selecionarPagamentoPedido(valor) {
        formaPagamento = valor;
        document.getElementById("pagamentoRow")?.classList.remove("invalid");
        document.querySelectorAll("#pagamentoRow .pill-opt").forEach((b) => {
          b.classList.toggle("selected", b.dataset.valor === valor);
        });
      }

      function enviarWhatsApp() {
        if (!cart.length) return;
        const nomeInput = document.getElementById("clienteNome");
        const nomeCliente = nomeInput.value.trim();
        if (!nomeCliente) {
          nomeInput.classList.remove("invalid");
          void nomeInput.offsetWidth; // reinicia a animação se já estava inválido
          nomeInput.classList.add("invalid");
          nomeInput.focus();
          showToast("Digite seu nome pra gente confirmar o pedido! 🤠");
          return;
        }
        nomeInput.classList.remove("invalid");

        if (!entregaTipo) {
          const row = document.getElementById("entregaRow");
          row.classList.remove("invalid");
          void row.offsetWidth;
          row.classList.add("invalid");
          showToast("Escolha delivery ou retirada! 🛵");
          return;
        }

        if (!formaPagamento) {
          const row = document.getElementById("pagamentoRow");
          row.classList.remove("invalid");
          void row.offsetWidth;
          row.classList.add("invalid");
          showToast("Escolha a forma de pagamento! 💳");
          return;
        }

        let msg = "🔥 *PEDIDO — DESMANTELO'S BURGUER* 🔥\n\n";
        msg += `👤 *Cliente:* ${nomeCliente}\n`;
        msg += `🛵 *${ENTREGA_LABELS[entregaTipo]}*\n`;
        if (entregaTipo === "delivery") {
          msg += `📍 _Consulte o valor da entrega com a gente aqui no WhatsApp — varia por localidade._\n`;
        }
        msg += `💳 *Pagamento:* ${PAGAMENTO_LABELS[formaPagamento]}\n\n`;
        cart.forEach((i, n) => {
          const qtd = i.qtd || 1;
          const nomeDisplay =
            i.bebidaId && bebidaQtd[i.bebidaId] > 1
              ? `${BEBIDAS.find((x) => x.id === i.bebidaId).nome} ×${bebidaQtd[i.bebidaId]}`
              : qtd > 1
                ? `${i.nome} ×${qtd}`
                : i.nome;
          msg += `*${n + 1}. ${nomeDisplay}* — R$ ${fmt(i.preco * qtd)}\n`;
          if (i.detalhe) msg += `   ➕ ${i.detalhe}\n`;
          if (i.obs) msg += `   📝 ${i.obs}\n`;
          msg += "\n";
          trackEvent("item_order", i.nome, i.categoria, { qtd });
        });
        msg += `──────────────────\n💰 *TOTAL: R$ ${fmt(calcTotal())}*\n──────────────────\n\nAguardo confirmação! 🤠`;
        window.open(
          `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
          "_blank",
        );
        trackEvent("order_sent", "whatsapp", null, {
          entrega_tipo: entregaTipo,
          forma_pagamento: formaPagamento,
          value: calcTotal(),
          currency: "BRL",
        });
        resetPedidoForm();
      }

      /* ═══════════════════════════════════════
   📊  ANALYTICS (GA4)
   ═══════════════════════════════════════ */
      // itemName/category populam item_name/item_category; extra é mesclado
      // como está (ex: {qtd}, {entrega_tipo, forma_pagamento}) — cada evento
      // usa só os campos que fazem sentido pra ele.
      function trackEvent(event, itemName, category, extra) {
        if (typeof gtag !== "function") return;
        const params = { ...extra };
        if (itemName) params.item_name = itemName;
        if (category) params.item_category = category;
        gtag("event", event, params);
      }

      /* ═══════════════════════════════════════
   🔁  NAV ATIVA AO ROLAR
   ═══════════════════════════════════════ */
      function initNavObserver() {
        const sections = document.querySelectorAll("main section[id]");
        const navBtns = document.querySelectorAll(".nav-btn[data-section]");
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                navBtns.forEach((b) => {
                  b.classList.toggle(
                    "active",
                    b.dataset.section === e.target.id,
                  );
                });
              }
            });
          },
          { threshold: 0.3, rootMargin: "-60px 0px -40% 0px" },
        );
        sections.forEach((s) => obs.observe(s));
      }

      /* ═══════════════════════════════════════
   🍞  TOAST
   ═══════════════════════════════════════ */
      let toastTimer;
      function showToast(msg) {
        const t = document.getElementById("toast");
        t.textContent = msg;
        t.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => t.classList.remove("show"), 2000);
      }

      /* INIT */
      renderBurgers();
      renderSanduiches();
      renderCombos();
      renderBatatas();
      renderBebidas();
      initNavObserver();

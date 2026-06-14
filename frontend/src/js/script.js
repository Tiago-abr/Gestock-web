document.addEventListener('DOMContentLoaded', () => {

    // MAPEAMENTO DE ELEMENTOS E SEÇÕES

    // Mapeamento das Seções
    const sections = {
        home: document.getElementById('section-home'),
        sobre: document.getElementById('section-sobre'),
        login: document.getElementById('section-login'),
        register: document.getElementById('section-register'),
        products: document.getElementById('section-products'),
        customers: document.getElementById('section-customers'),
        sales: document.getElementById('section-sales')
    };

    // Mapeamento de Elementos de Navegação do Header
    const menuLinks = {
        home: document.getElementById('link-home'),
        sobre: document.getElementById('link-sobre'),
        dashboard: document.getElementById('link-dashboard'),
        customersNav: document.getElementById('link-customers-nav'),
        salesNav: document.getElementById('link-sales-nav')
    };

    const authLinks = {
        login: document.getElementById('link-login'),
        register: document.getElementById('link-register'),
        logout: document.getElementById('link-logout')
    };

    // Elementos de Links e Botões de Ação Comuns
    const navLogo = document.getElementById('nav-logo');
    const heroStart = document.getElementById('hero-start');
    const heroLearnMore = document.getElementById('hero-learn-more');
    const linkGoRegister = document.getElementById('link-go-register');
    const linkGoLogin = document.getElementById('link-go-login');

    // Elementos de Formulários de Autenticação
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    // Elementos de Controle do Painel de Produtos
    const formProduct = document.getElementById('form-product');
    const productFormTitle = document.getElementById('product-form-title');
    const idEditingInput = document.getElementById('product-id-editing');
    const btnProductSubmit = document.getElementById('btn-product-submit');
    const btnProductCancel = document.getElementById('btn-product-cancel');

    // Elementos de Controle do Painel de Clientes
    const formCustomer = document.getElementById('form-customer');
    const customerFormTitle = document.getElementById('customer-form-title');
    const customerIdEditingInput = document.getElementById('customer-id-editing');
    const btnCustomerSubmit = document.getElementById('btn-customer-submit');
    const btnCustomerCancel = document.getElementById('btn-customer-cancel');

    // Elementos de Controle do Painel de Vendas
    const formSaleSetup = document.getElementById('form-sale-setup');
    const saleIdEditingInput = document.getElementById('sale-id-editing');
    const btnAddItem = document.getElementById('btn-add-item');
    const btnSubmitSale = document.getElementById('btn-submit-sale');
    const cartList = document.getElementById('cart-list');
    const cartEmptyMsg = document.getElementById('cart-empty-msg');

    // CONFIGURAÇÕES, ENDPOINTS E ESTADOS GLOBAIS
    const AUTH_URL = 'http://localhost:8080/auth';
    const PRODUCTS_URL = 'http://localhost:8080/products';
    const CUSTOMERS_URL = 'http://localhost:8080/customers';
    const SALES_URL = 'http://localhost:8080/sales';

    let tempCartItems = [];

    let btnSaleCancel = document.getElementById('btn-sale-cancel');
    if (!btnSaleCancel && formSaleSetup) {
        btnSaleCancel = document.createElement('button');
        btnSaleCancel.type = 'button';
        btnSaleCancel.className = 'btn btn-secondary btn-block';
        btnSaleCancel.id = 'btn-sale-cancel';
        btnSaleCancel.textContent = 'Cancelar Edição';
        btnSaleCancel.style.display = 'none';
        btnSaleCancel.style.marginTop = '0.5rem';
        if (btnSubmitSale) btnSubmitSale.parentNode.appendChild(btnSaleCancel);
    }

    // SISTEMA DE GUARDA DE ROTAS E NAVEGAÇÃO
    function checkAuthStatus() {
        const isLoggedIn = localStorage.getItem('gestock_logged') === 'true';

        if (isLoggedIn) {
            if (authLinks.login) authLinks.login.style.display = 'none';
            if (authLinks.register) authLinks.register.style.display = 'none';
            if (menuLinks.dashboard) menuLinks.dashboard.style.display = 'inline-block';
            if (menuLinks.customersNav) menuLinks.customersNav.style.display = 'inline-block';
            if (menuLinks.salesNav) menuLinks.salesNav.style.display = 'inline-block';
            if (authLinks.logout) authLinks.logout.style.display = 'inline-block';
        } else {
            if (authLinks.login) authLinks.login.style.display = 'inline-block';
            if (authLinks.register) authLinks.register.style.display = 'inline-block';
            if (menuLinks.dashboard) menuLinks.dashboard.style.display = 'none';
            if (menuLinks.customersNav) menuLinks.customersNav.style.display = 'none';
            if (menuLinks.salesNav) menuLinks.salesNav.style.display = 'none';
            if (authLinks.logout) authLinks.logout.style.display = 'none';
        }
        return isLoggedIn;
    }

    function navigateTo(targetPage) {
        const privadas = ['products', 'customers', 'sales'];
        if (privadas.includes(targetPage) && !checkAuthStatus()) {
            alert('Acesso negado. Por favor, faça login primeiro.');
            targetPage = 'login';
        }

        Object.values(sections).forEach(sec => { if (sec) sec.classList.remove('active'); });
        Object.values(menuLinks).forEach(lnk => { if (lnk) lnk.classList.remove('active'); });

        if (sections[targetPage]) {
            sections[targetPage].classList.add('active');
        }

        if (menuLinks[targetPage]) {
            menuLinks[targetPage].classList.add('active');
        } else if (targetPage === 'products' && menuLinks.dashboard) {
            menuLinks.dashboard.classList.add('active');
            fetchProducts();
        } else if (targetPage === 'customers' && menuLinks.customersNav) {
            menuLinks.customersNav.classList.add('active');
            fetchCustomers();
        } else if (targetPage === 'sales' && menuLinks.salesNav) {
            menuLinks.salesNav.classList.add('active');
            fetchSales();
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Configuração de Eventos de Navegação com Null-Check defensivo
    if (menuLinks.home) menuLinks.home.addEventListener('click', (e) => { e.preventDefault(); navigateTo('home'); });
    if (menuLinks.sobre) menuLinks.sobre.addEventListener('click', (e) => { e.preventDefault(); navigateTo('sobre'); });
    if (menuLinks.dashboard) menuLinks.dashboard.addEventListener('click', (e) => { e.preventDefault(); navigateTo('products'); });
    if (menuLinks.customersNav) menuLinks.customersNav.addEventListener('click', (e) => { e.preventDefault(); navigateTo('customers'); });
    if (menuLinks.salesNav) menuLinks.salesNav.addEventListener('click', (e) => { e.preventDefault(); navigateTo('sales'); });

    if (authLinks.login) authLinks.login.addEventListener('click', (e) => { e.preventDefault(); navigateTo('login'); });
    if (authLinks.register) authLinks.register.addEventListener('click', (e) => { e.preventDefault(); navigateTo('register'); });

    if (navLogo) navLogo.addEventListener('click', () => navigateTo('home'));
    if (heroStart) heroStart.addEventListener('click', () => navigateTo(checkAuthStatus() ? 'products' : 'register'));
    if (heroLearnMore) heroLearnMore.addEventListener('click', () => navigateTo('sobre'));
    if (linkGoRegister) linkGoRegister.addEventListener('click', (e) => { e.preventDefault(); navigateTo('register'); });
    if (linkGoLogin) linkGoLogin.addEventListener('click', (e) => { e.preventDefault(); navigateTo('login'); });

    if (authLinks.logout) {
        authLinks.logout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('gestock_logged');
            localStorage.removeItem('gestock_token');
            checkAuthStatus();
            navigateTo('home');
            alert('Sessão encerrada.');
        });
    }

    // REQUISIÇÕES: AUTENTICAÇÃO (LOGIN & REGISTRO)
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            try {
                const response = await fetch(`${AUTH_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });

                if (response.ok) {
                    const data = await response.json().catch(() => ({}));
                    localStorage.setItem('gestock_logged', 'true');
                    if (data.token) localStorage.setItem('gestock_token', data.token);

                    checkAuthStatus();
                    navigateTo('products');
                    formLogin.reset();
                } else { alert('Erro nas credenciais de Login.'); }
            } catch (error) { alert('Não foi possível conectar ao backend.'); }
        });
    }

    if (formRegister) {
        formRegister.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            try {
                const response = await fetch(`${AUTH_URL}/register`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, email, password })
                });
                if (response.ok) {
                    alert('Cadastro efetuado! Faça o login.');
                    navigateTo('login');
                    formRegister.reset();
                } else { alert('Erro ao registrar usuário.'); }
            } catch (error) { alert('Falha na comunicação.'); }
        });
    }

    // FUNÇÕES DE RESET E UTILIDADE
    function resetProductForm() {
        if (formProduct) formProduct.reset();
        if (idEditingInput) idEditingInput.value = "";
        if (productFormTitle) productFormTitle.textContent = "Novo Produto";
        if (btnProductSubmit) btnProductSubmit.textContent = "Cadastrar Produto";
        if (btnProductCancel) btnProductCancel.style.display = "none";
    }

    function resetCustomerForm() {
        if (formCustomer) formCustomer.reset();
        if (customerIdEditingInput) customerIdEditingInput.value = "";
        if (customerFormTitle) customerFormTitle.textContent = "Novo Cliente";
        if (btnCustomerSubmit) btnCustomerSubmit.textContent = "Cadastrar Cliente";
        if (btnCustomerCancel) btnCustomerCancel.style.display = "none";
    }

    function resetSaleForm() {
        if (formSaleSetup) formSaleSetup.reset();
        if (saleIdEditingInput) saleIdEditingInput.value = "";
        tempCartItems = [];
        if (cartList) cartList.innerHTML = '<li id="cart-empty-msg">Nenhum item adicionado ainda</li>';
        if (btnSubmitSale) {
            btnSubmitSale.textContent = "Finalizar Venda";
            btnSubmitSale.setAttribute('disabled', 'true');
        }
        if (btnSaleCancel) btnSaleCancel.style.display = "none";
    }

    // REQUISIÇÕES: PAINEL DE PRODUTOS (CRUD)
    if (formProduct) {
        formProduct.addEventListener('submit', async (e) => {
            e.preventDefault();

            const idEditing = idEditingInput.value;
            const name = document.getElementById('product-name').value;
            const category = document.getElementById('product-category').value;
            const price = parseFloat(document.getElementById('product-price').value);
            const stockQuantity = parseInt(document.getElementById('product-stock').value);

            const headers = { 'Content-Type': 'application/json' };
            const token = localStorage.getItem('gestock_token');
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const productPayload = { name, category, price, stockQuantity };

            try {
                let response;
                if (idEditing) {
                    response = await fetch(`${PRODUCTS_URL}/${idEditing}`, {
                        method: 'PUT',
                        headers: headers,
                        body: JSON.stringify(productPayload)
                    });
                } else {
                    response = await fetch(PRODUCTS_URL, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(productPayload)
                    });
                }

                if (response.ok) {
                    alert(idEditing ? 'Produto atualizado com sucesso!' : 'Produto cadastrado com sucesso!');
                    resetProductForm();
                    fetchProducts();
                } else { alert('Erro ao salvar o produto. Verifique as regras no backend.'); }
            } catch (error) { alert('Erro de conexão ao tentar salvar o produto.'); }
        });
    }

    window.prepareEditProduct = function (id, name, category, price, stock) {
        if (!formProduct) return;
        idEditingInput.value = id;
        document.getElementById('product-name').value = name;
        document.getElementById('product-category').value = category;
        document.getElementById('product-price').value = price;
        document.getElementById('product-stock').value = stock;

        if (productFormTitle) productFormTitle.textContent = "Editar Produto";
        if (btnProductSubmit) btnProductSubmit.textContent = "Salvar Alterações";
        if (btnProductCancel) btnProductCancel.style.display = "inline-block";

        window.scrollTo({ top: formProduct.offsetTop - 100, behavior: 'smooth' });
    };

    if (btnProductCancel) {
        btnProductCancel.addEventListener('click', () => { resetProductForm(); });
    }

    window.deleteProduct = async function (id) {
        if (!confirm('Tem certeza que deseja excluir permanentemente este produto?')) return;

        const headers = {};
        const token = localStorage.getItem('gestock_token');
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(`${PRODUCTS_URL}/${id}`, { method: 'DELETE', headers: headers });
            if (response.ok) {
                alert('Produto removido com sucesso!');
                if (idEditingInput && idEditingInput.value == id) resetProductForm();
                fetchProducts();
            } else { alert('Não foi possível excluir o produto. Ele pode estar vinculado a uma venda ativa.'); }
        } catch (error) { alert('Erro de conexão ao tentar excluir o produto.'); }
    };

    async function fetchProducts() {
        const tableBody = document.getElementById('product-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '<tr><td colspan="5">Carregando itens...</td></tr>';

        const headers = {};
        const token = localStorage.getItem('gestock_token');
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(PRODUCTS_URL, { method: 'GET', headers: headers });
            if (response.ok) {
                const products = await response.json();
                tableBody.innerHTML = '';

                if (products.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="5">Nenhum produto em estoque.</td></tr>';
                    return;
                }

                products.forEach(prod => {
                    const row = document.createElement('tr');
                    const safeName = prod.name.replace(/'/g, "\\'");
                    const safeCategory = prod.category.replace(/'/g, "\\'");

                    row.innerHTML = `
                        <td><strong>${prod.name}</strong></td>
                        <td>${prod.category}</td>
                        <td>R$ ${prod.price.toFixed(2)}</td>
                        <td>${prod.stockQuantity} un</td>
                        <td>
                            <button class="btn-action-edit" onclick="prepareEditProduct(${prod.id}, '${safeName}', '${safeCategory}', ${prod.price}, ${prod.stockQuantity})">Editar</button>
                            <button class="btn-action-delete" onclick="deleteProduct(${prod.id})">Excluir</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            } else { tableBody.innerHTML = '<tr><td colspan="5" style="color:red;">Erro ao obter dados.</td></tr>'; }
        } catch (error) { tableBody.innerHTML = '<tr><td colspan="5" style="color:red;">Servidor offline.</td></tr>'; }
    }

    // REQUISIÇÕES: PAINEL DE CLIENTES (CRUD)
    if (formCustomer) {
        formCustomer.addEventListener('submit', async (e) => {
            e.preventDefault();

            const idEditing = customerIdEditingInput.value;
            const name = document.getElementById('customer-name').value;
            const documentField = document.getElementById('customer-document').value;
            const phoneNumber = document.getElementById('customer-phone').value;
            const address = document.getElementById('customer-address').value;

            const headers = { 'Content-Type': 'application/json' };
            const token = localStorage.getItem('gestock_token');
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const customerPayload = { name: name, document: documentField, phoneNumber, address };

            try {
                let response;
                if (idEditing) {
                    response = await fetch(`${CUSTOMERS_URL}/${idEditing}`, {
                        method: 'PUT',
                        headers: headers,
                        body: JSON.stringify(customerPayload)
                    });
                } else {
                    response = await fetch(CUSTOMERS_URL, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(customerPayload)
                    });
                }

                if (response.ok) {
                    alert(idEditing ? 'Dados do cliente atualizados!' : 'Cliente cadastrado com sucesso!');
                    resetCustomerForm();
                    fetchCustomers();
                } else { alert('Erro ao salvar cliente. Verifique o backend.'); }
            } catch (error) { alert('Erro de conexão ao salvar cliente.'); }
        });
    }

    window.prepareEditCustomer = function (id, name) {
        if (!formCustomer) return;
        customerIdEditingInput.value = id;
        document.getElementById('customer-name').value = name;
        document.getElementById('customer-document').value = "";
        document.getElementById('customer-phone').value = "";
        document.getElementById('customer-address').value = "";

        if (customerFormTitle) customerFormTitle.textContent = "Editar Cliente";
        if (btnCustomerSubmit) btnCustomerSubmit.textContent = "Salvar Alterações";
        if (btnCustomerCancel) btnCustomerCancel.style.display = "inline-block";

        window.scrollTo({ top: formCustomer.offsetTop - 100, behavior: 'smooth' });
    };

    if (btnCustomerCancel) {
        btnCustomerCancel.addEventListener('click', () => { resetCustomerForm(); });
    }

    window.deleteCustomer = async function (id) {
        if (!confirm('Deseja realmente remover este cliente do sistema?')) return;

        const headers = {};
        const token = localStorage.getItem('gestock_token');
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(`${CUSTOMERS_URL}/${id}`, { method: 'DELETE', headers: headers });
            if (response.ok) {
                alert('Cliente removido com sucesso!');
                if (customerIdEditingInput && customerIdEditingInput.value == id) resetCustomerForm();
                fetchCustomers();
            } else { alert('Não foi possível excluir o cliente. Ele pode possuir histórico de vendas vinculadas.'); }
        } catch (error) { alert('Erro de conexão ao tentar remover cliente.'); }
    };

    async function fetchCustomers() {
        const tableBody = document.getElementById('customer-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '<tr><td colspan="3">Carregando clientes...</td></tr>';

        const headers = {};
        const token = localStorage.getItem('gestock_token');
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(CUSTOMERS_URL, { method: 'GET', headers: headers });
            if (response.ok) {
                const customers = await response.json();
                tableBody.innerHTML = '';

                if (customers.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="3">Nenhum cliente cadastrado.</td></tr>';
                    return;
                }

                customers.forEach(cust => {
                    const row = document.createElement('tr');
                    const safeName = cust.name.replace(/'/g, "\\'");

                    row.innerHTML = `
                        <td><code>#${cust.id}</code></td>
                        <td><strong>${cust.name}</strong></td>
                        <td>
                            <button class="btn-action-edit" onclick="prepareEditCustomer(${cust.id}, '${safeName}')">Editar</button>
                            <button class="btn-action-delete" onclick="deleteCustomer(${cust.id})">Excluir</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            } else { tableBody.innerHTML = '<tr><td colspan="3">Erro ao obter clientes.</td></tr>'; }
        } catch (error) { tableBody.innerHTML = '<tr><td colspan="3">Servidor offline.</td></tr>'; }
    }

    // REQUISIÇÕES:  VENDAS (CRUD)
    if (btnAddItem) {
        btnAddItem.addEventListener('click', () => {
            const productIdInput = document.getElementById('sale-product-id');
            const quantityInput = document.getElementById('sale-quantity');

            const productId = parseInt(productIdInput.value);
            const quantity = parseInt(quantityInput.value);

            if (isNaN(productId) || isNaN(quantity) || quantity <= 0) {
                alert('Por favor, informe um ID de produto e uma Quantidade válida.');
                return;
            }

            tempCartItems.push({ productId, quantity });

            if (cartEmptyMsg) cartEmptyMsg.style.display = 'none';

            if (cartList) {
                const listItem = document.createElement('li');
                listItem.textContent = `Produto ID: ${productId} — Qtd: ${quantity}`;
                cartList.appendChild(listItem);
            }

            if (btnSubmitSale) btnSubmitSale.removeAttribute('disabled');

            productIdInput.value = '';
            quantityInput.value = '';
        });
    }

    if (btnSubmitSale) {
        btnSubmitSale.addEventListener('click', async () => {
            const idSaleEditing = saleIdEditingInput ? saleIdEditingInput.value : "";
            const customerId = parseInt(document.getElementById('sale-customer-id').value);

            if (isNaN(customerId)) {
                alert('Por favor, defina um ID de cliente válido antes de processar.');
                return;
            }

            if (tempCartItems.length === 0) {
                alert('Adicione pelo menos um item ao carrinho antes de salvar.');
                return;
            }

            const salePayload = { customerId: customerId, userId: 1, items: tempCartItems };

            const headers = { 'Content-Type': 'application/json' };
            const token = localStorage.getItem('gestock_token');
            if (token) headers['Authorization'] = `Bearer ${token}`;

            try {
                let response;
                if (idSaleEditing) {
                    response = await fetch(`${SALES_URL}/${idSaleEditing}`, {
                        method: 'PUT',
                        headers: headers,
                        body: JSON.stringify(salePayload)
                    });
                } else {
                    response = await fetch(SALES_URL, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify(salePayload)
                    });
                }

                if (response.ok) {
                    alert(idSaleEditing ? 'Venda atualizada com sucesso!' : 'Venda registrada com sucesso!');
                    resetSaleForm();
                    fetchSales();
                } else { alert('Erro ao processar a venda. Verifique os dados inseridos.'); }
            } catch (error) { alert('Falha na conexão ao processar operação de venda.'); }
        });
    }

    window.prepareEditSale = function (id, customerId) {
        if (!formSaleSetup) return;
        if (saleIdEditingInput) saleIdEditingInput.value = id;

        const customerInput = document.getElementById('sale-customer-id');
        if (customerInput) customerInput.value = customerId;

        tempCartItems = [];
        if (cartList) cartList.innerHTML = '<li id="cart-empty-msg" style="color: #ff9800; font-weight: bold;">Monte o novo carrinho desta venda abaixo:</li>';

        if (btnSubmitSale) {
            btnSubmitSale.textContent = "Salvar Alterações da Venda";
            btnSubmitSale.removeAttribute('disabled');
        }
        if (btnSaleCancel) btnSaleCancel.style.display = "block";

        window.scrollTo({ top: formSaleSetup.offsetTop - 100, behavior: 'smooth' });
    };

    if (btnSaleCancel) {
        btnSaleCancel.addEventListener('click', () => { resetSaleForm(); });
    }

    window.deleteSale = async function (id) {
        if (!confirm('Atenção: Excluir esta venda estornará os itens de volta ao estoque no banco de dados. Deseja continuar?')) return;

        const headers = {};
        const token = localStorage.getItem('gestock_token');
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(`${SALES_URL}/${id}`, { method: 'DELETE', headers: headers });
            if (response.ok) {
                alert('Venda excluída/estornada com sucesso!');
                if (saleIdEditingInput && saleIdEditingInput.value == id) resetSaleForm();
                fetchSales();
            } else { alert('Erro ao excluir venda no servidor.'); }
        } catch (error) { alert('Erro de conexão ao tentar excluir venda.'); }
    };

    async function fetchSales() {
        const tableBody = document.getElementById('sales-table-body');
        if (!tableBody) return;
        tableBody.innerHTML = '<tr><td colspan="7">Carregando histórico...</td></tr>';

        const headers = {};
        const token = localStorage.getItem('gestock_token');
        if (token) headers['Authorization'] = `Bearer ${token}`;

        try {
            const response = await fetch(SALES_URL, { method: 'GET', headers: headers });
            if (response.ok) {
                const sales = await response.json();
                tableBody.innerHTML = '';

                if (!sales || sales.length === 0) {
                    tableBody.innerHTML = '<tr><td colspan="7">Nenhuma venda registrada até o momento.</td></tr>';
                    return;
                }

                const salesArray = Array.isArray(sales) ? sales : [sales];

                salesArray.forEach(sale => {
                    const formattedDate = sale.saleDate ? new Date(sale.saleDate).toLocaleString('pt-BR') : 'N/A';

                    let itemsHtml = '';
                    if (sale.items && sale.items.length > 0) {
                        sale.items.forEach(it => {
                            itemsHtml += `<span class="product-spec-badge">${it.productName || 'Prod #' + it.productId} (x${it.quantity})</span>`;
                        });
                    } else { itemsHtml = '<em>Nenhum item</em>'; }

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><code>#${sale.id}</code></td>
                        <td>${sale.customerName || 'ID: ' + sale.customerId}</td>
                        <td>${sale.userName || 'Sistema'}</td>
                        <td><strong>R$ ${sale.totalAmount.toFixed(2)}</strong></td>
                        <td><small>${formattedDate}</small></td>
                        <td>${itemsHtml}</td>
                        <td>
                            <button class="btn-action-edit" onclick="prepareEditSale(${sale.id}, ${sale.customerId})">Editar</button>
                            <button class="btn-action-delete" onclick="deleteSale(${sale.id})">Excluir</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            } else { tableBody.innerHTML = '<tr><td colspan="7">Erro ao obter histórico.</td></tr>'; }
        } catch (error) { tableBody.innerHTML = '<tr><td colspan="7">Servidor offline.</td></tr>'; }
    }

    checkAuthStatus();
});
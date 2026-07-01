const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const list = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
const ordered = (items) => `<ol>${items.map((item) => `<li>${item}</li>`).join("")}</ol>`;
const code = (lang, value) => `<pre><code class="language-${lang}">${esc(value)}</code></pre>`;
const tree = (value) => `<div class="tree">${esc(value)}</div>`;
const diagram = (value) => `<pre class="mermaid">${esc(value)}</pre>`;
const callout = (value) => `<div class="callout"><p>${value}</p></div>`;
const table = (headers, rows) => `
  <table>
    <thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
    <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
  </table>
`;
const cards = (items, columns = "two") => `
  <div class="grid ${columns}">
    ${items.map((item) => `<div class="card"><h3>${item.title}</h3><p>${item.body}</p></div>`).join("")}
  </div>
`;
const tags = (items) => `<div class="tag-row">${items.map((item) => `<span class="tag">${item}</span>`).join("")}</div>`;
const storyBox = (value) => `<div class="story-box"><p>${value}</p></div>`;

const slides = [
  {
    className: "hero-title",
    html: `
      <p class="kicker">Tutorial Web Programming untuk Pemula</p>
      <h1>Cooking Gallery</h1>
      <p class="subtitle">Belajar Membuat Website Resep dengan PHP, MySQL, dan OOP</p>
      <aside class="notes">Hari ini kita tidak langsung membuat aplikasi besar. Kita akan belajar membuat aplikasi kecil tapi lengkap, supaya paham cara kerja website yang menyimpan data.</aside>
    `
  },
  {
    title: "Perjalanan Belajar Kita",
    html: `${list([
      "Database sebagai rumah data",
      "Table, row, dan column",
      "Entity dan relationship",
      "OOP: class, object, attribute, method",
      "Product design sebelum coding",
      "PHP dasar, include, header, dan footer",
      "Koneksi MySQL, register, login, submit resep",
      "Security dasar: XSS dan SQL Injection"
    ])}${callout("Kita belajar dari konsep dulu, baru masuk ke praktik.")}`
  },
  {
    title: "Kenapa Aplikasi Butuh Database?",
    html: `
      <div class="media-split">
        <div>
          <p>Kalau kita membuat aplikasi, datanya harus disimpan di suatu tempat.</p>
          ${tags([
            "nama user", "email", "password", "judul resep", "bahan masakan", "komentar", "status approval"
          ])}
          ${callout("Aplikasi tanpa database seperti buku catatan yang selalu hilang saat ditutup.")}
        </div>
        <figure class="slide-visual">
          <img src="assets/images/database-house-illustration.png" alt="Ilustrasi data dari aplikasi resep tersimpan di rumah database">
        </figure>
      </div>
    `
  },
  {
    title: "Database = Rumah Data",
    html: `<p>Database adalah tempat menyimpan data secara teratur.</p><p>Kata <strong>base</strong> bisa dibayangkan sebagai tempat, markas, atau rumah. Jadi, <strong>database = rumah data</strong>.</p>${callout("Kalau aplikasi adalah restoran, database adalah gudang dan lemari arsipnya.")}`
  },
  {
    title: "MySQL: Rumah Data Kita",
    html: `<p>MySQL adalah software database. PHP berbicara dengan MySQL untuk menyimpan, membaca, mengubah, dan menghapus data.</p>${diagram(`flowchart LR
    A[Browser] --> B[PHP]
    B --> C[MySQL]
    C --> B
    B --> A`)}${callout("Browser tidak langsung berbicara dengan MySQL. Browser meminta halaman ke PHP, lalu PHP mengambil data dari MySQL.")}`
  },
  {
    title: "Isi Rumah Data",
    html: `
      <div class="analogy-layout">
        <figure class="analogy-image">
          <img src="assets/images/filing-drawer-database-analogy.png" alt="Ilustrasi laci arsip dengan map dan kartu data sebagai analogi database">
          <div class="filing-caption">
            <strong>Bayangkan database seperti lemari arsip.</strong>
            Data tidak tercecer, tapi disimpan rapi di laci dan map.
          </div>
        </figure>
        <div>
          <div class="analogy-legend">
            <p><strong>Database</strong> = lemari besar</p>
            <p><strong>Table</strong> = laci / map khusus</p>
            <p><strong>Column</strong> = jenis informasi</p>
            <p><strong>Row</strong> = satu data lengkap</p>
          </div>
          ${table(["Database Concept", "Analogi"], [
            ["Database", "Lemari arsip besar"],
            ["Table", "Rak / map khusus"],
            ["Column", "Jenis informasi"],
            ["Row", "Satu data lengkap"]
          ])}
          ${callout("Satu baris adalah satu data lengkap. Satu kolom adalah satu jenis informasi.")}
        </div>
      </div>
    `
  },
  {
    title: "Apa Itu Entity?",
    html: `<p>Entity adalah benda penting dalam aplikasi yang datanya perlu disimpan.</p>${cards([
      { title: "User", body: "Orang yang memakai aplikasi." },
      { title: "Recipe", body: "Resep yang ditulis dan dibaca." },
      { title: "Category", body: "Kelompok resep, misalnya dessert." },
      { title: "Comment", body: "Komentar dari user." }
    ])}${callout("Kalau sesuatu penting untuk aplikasi, biasanya dia akan menjadi table di database.")}`
  },
  {
    title: "Data Punya Hubungan",
    html: `
      <div class="media-split">
        <div>
          <p>Data tidak hidup sendirian. Di aplikasi resep, data saling terhubung seperti anggota keluarga.</p>
          ${list([
            "Satu user bisa menulis banyak resep.",
            "Satu resep bisa punya banyak komentar.",
            "Satu kategori bisa punya banyak resep."
          ])}
          ${callout("Relationship membantu kita memahami hubungan antar data.")}
        </div>
        <figure class="slide-visual">
          <img src="assets/images/relationship-family-tree.png" alt="Ilustrasi family tree sebagai analogi hubungan antar data">
        </figure>
      </div>
    `
  },
  {
    title: "Jenis Relasi Data",
    html: `${cards([
      { title: "One-to-one", body: "Satu orang punya satu KTP." },
      { title: "One-to-many", body: "Satu user bisa menulis banyak resep." },
      { title: "Many-to-many", body: "Satu siswa bisa ikut banyak pelajaran, dan satu pelajaran bisa diikuti banyak siswa." }
    ], "three")}${callout("Untuk Cooking Gallery, kita paling sering memakai one-to-many.")}`
  },
  {
    title: "Dari Cerita ke ER Diagram",
    html: `
      <p>Sebelum membuat table, kita ubah cerita menjadi gambar hubungan data.</p>
      ${cards([
        { title: "Ayah", body: "Entity: benda atau tokoh penting yang datanya disimpan." },
        { title: "Anak", body: "Entity lain yang juga punya data sendiri." },
        { title: "Punya", body: "Relationship: garis hubungan antar entity." }
      ], "three")}
      ${callout("ER Diagram adalah gambar cerita data: siapa tokohnya, dan bagaimana mereka terhubung.")}
    `
  },
  {
    title: "Ayah dan Anak",
    html: `
      <div class="grid two">
        <div>
          <p>Contoh sederhana:</p>
          ${list([
            "Satu Ayah bisa punya banyak Anak.",
            "Dalam versi sederhana, satu Anak menunjuk ke satu Ayah.",
            "Table <code>kids</code> bisa menyimpan <code>dad_id</code>."
          ])}
          ${callout("Ini disebut one-to-many dari sisi Ayah ke Anak.")}
        </div>
        ${diagram(`erDiagram
    DADS ||--o{ KIDS : has`)}
      </div>
    `
  },
  {
    title: "Tambahkan Ibu",
    html: `
      <div class="grid two">
        <div>
          <p>Sekarang ceritanya bertambah: Anak juga punya Ibu.</p>
          ${list([
            "Satu Ibu bisa punya banyak Anak.",
            "Satu Anak bisa punya garis ke Ayah dan Ibu.",
            "Semakin banyak entity, semakin banyak garis hubungan."
          ])}
          ${callout("Kita mulai melihat bahwa hubungan data bisa lebih dari satu garis.")}
        </div>
        ${diagram(`erDiagram
    DADS ||--o{ KIDS : father_of
    MOMS ||--o{ KIDS : mother_of`)}
      </div>
    `
  },
  {
    title: "Table Kids Berubah",
    html: `
      <p>Kalau Anak punya hubungan ke Ayah dan Ibu, table <code>kids</code> perlu menyimpan alamat ke dua table itu.</p>
      <div class="grid two">
        <div>
          ${table(["Column", "Artinya"], [
            ["id", "ID anak"],
            ["name", "Nama anak"],
            ["dad_id", "Terhubung ke table dads"],
            ["mom_id", "Terhubung ke table moms"]
          ])}
          ${callout("<code>dad_id</code> dan <code>mom_id</code> adalah foreign key. Mereka seperti tali kecil yang menghubungkan Anak ke Ayah dan Ibu.")}
        </div>
        ${diagram(`erDiagram
    DADS ||--o{ KIDS : father_of
    MOMS ||--o{ KIDS : mother_of

    KIDS {
        int id PK
        string name
        int dad_id FK
        int mom_id FK
    }`)}
      </div>
    `
  },
  {
    title: "Family Register sebagai Buku Keluarga",
    html: `
      <p>Bayangkan ada <strong>buku keluarga</strong>. Buku ini bukan Ayah, bukan Ibu, dan bukan Anak. Buku ini mencatat siapa saja yang masuk dalam satu keluarga.</p>
      ${cards([
        { title: "family_registers", body: "Buku / catatan keluarga." },
        { title: "dads", body: "Data Ayah." },
        { title: "moms", body: "Data Ibu." },
        { title: "kids", body: "Data Anak." }
      ])}
      ${callout("Karena register hanya buku pencatat, kita butuh table penghubung untuk menulis siapa yang muncul di buku itu.")}
    `
  },
  {
    title: "Connector Table",
    html: `
      <p>Connector table menyimpan pasangan data, misalnya: family register A berisi dad B.</p>
      ${diagram(`erDiagram
    FAMILY_REGISTERS ||--o{ FAMILY_REGISTER_TO_DAD : has
    DADS ||--o{ FAMILY_REGISTER_TO_DAD : listed_in

    FAMILY_REGISTERS ||--o{ FAMILY_REGISTER_TO_MOM : has
    MOMS ||--o{ FAMILY_REGISTER_TO_MOM : listed_in

    FAMILY_REGISTERS ||--o{ FAMILY_REGISTER_TO_KID : has
    KIDS ||--o{ FAMILY_REGISTER_TO_KID : listed_in`)}
      ${callout("Table penghubung membuat hubungan many-to-many lebih rapi dan jelas.")}
    `
  },
  {
    title: "Desain Bisa Dioptimalkan",
    html: `
      <div class="grid two">
        <div>
          <p>Setelah paham versi jelasnya, kita bisa melihat pola: Dad, Mom, dan Kid sebenarnya sama-sama orang.</p>
          ${list([
            "<code>family_members</code> menyimpan semua orang.",
            "<code>type</code> membedakan <code>dad</code>, <code>mom</code>, dan <code>kid</code>.",
            "<code>family_register_members</code> menjadi satu connector table."
          ])}
          ${callout("Desain pertama membantu belajar. Desain optimal mengurangi table yang berulang.")}
        </div>
        ${diagram(`erDiagram
    FAMILY_REGISTERS ||--o{ FAMILY_REGISTER_MEMBERS : has
    FAMILY_MEMBERS ||--o{ FAMILY_REGISTER_MEMBERS : listed_in

    FAMILY_MEMBERS {
        int id PK
        string name
        string type
    }`)}
      </div>
    `
  },
  {
    title: "Database Merapikan Data, OOP Merapikan Kode",
    html: `<p>Database membantu kita mengatur data. OOP membantu kita mengatur kode.</p>${callout("Saat aplikasi makin besar, kode harus dirapikan supaya mudah dipahami.")}`
  },
  {
    className: "chapter",
    skipStory: true,
    html: `
      <p class="kicker">Bagian OOP</p>
      <h2>Class dan Object</h2>
      <p>Sekarang kita belajar cara merapikan kode dengan cerita sederhana: cetakan kue dan kue yang sudah jadi.</p>
      ${tags(["class = cetakan", "object = hasil nyata", "attribute = ciri", "method = aksi"])}
    `
  },
  {
    title: "Class dan Object",
    html: `
      <div class="media-split">
        <div>
          <p>Class adalah cetakan kue. Object adalah kue yang sudah jadi.</p>
          ${cards([
            { title: "Class", body: "<code>User</code>" },
            { title: "Object", body: "<code>Budi</code>, <code>Siti</code>, <code>Andi</code>" }
          ])}
          ${callout("Class adalah rancangan. Object adalah hasil nyata dari rancangan itu.")}
        </div>
        <figure class="slide-visual">
          <img src="assets/images/class-object-cookie-mold.png" alt="Ilustrasi cetakan kue sebagai class dan beberapa kue jadi sebagai object">
        </figure>
      </div>
    `
  },
  {
    title: "Attribute",
    html: `
      <div class="media-split">
        <div>
          <p>Attribute adalah data atau sifat yang dimiliki object.</p>
          ${cards([
            { title: "Cetakan kue", body: "material, bentuk, ukuran" },
            { title: "Kue jadi", body: "warna, dekorasi, rasa" },
            { title: "User", body: "username, email, status" },
            { title: "Recipe", body: "title, difficulty, cooking_time" }
          ])}
          ${callout("Attribute menjawab pertanyaan: object ini punya ciri apa?")}
        </div>
        <figure class="slide-visual">
          <img src="assets/images/attribute-cookie-mold.png" alt="Ilustrasi attribute sebagai ciri cetakan kue dan kue jadi">
        </figure>
      </div>
    `
  },
  {
    title: "Method",
    html: `
      <div class="media-split">
        <div>
          <p>Method adalah aksi yang bisa dilakukan object.</p>
          ${cards([
            { title: "Cetakan kue bisa", body: "pressDough(), liftMold(), makeShape()" },
            { title: "User bisa", body: "register(), login(), updateProfile()" },
            { title: "Recipe bisa", body: "create(), approve(), getLatest()" }
          ])}
          ${callout("Attribute menjelaskan object punya apa. Method menjelaskan object bisa melakukan apa.")}
        </div>
        <figure class="slide-visual">
          <img src="assets/images/method-cookie-mold-actions.png" alt="Ilustrasi method sebagai aksi cetakan kue menekan adonan, diangkat, lalu menghasilkan bentuk kue">
        </figure>
      </div>
    `
  },
  {
    title: "Public dan Private",
    html: `${cards([
      { title: "Public", body: "Seperti ruang tamu. Bagian ini boleh diakses dari luar." },
      { title: "Private", body: "Seperti kamar pribadi atau brankas. Bagian ini tidak boleh diakses sembarangan." }
    ])}<p>Password tidak boleh diperlakukan seperti data biasa. Password harus diamankan dengan <code>password_hash()</code>.</p>`
  },
  {
    title: "Jangan Langsung Coding",
    html: `<p>Programmer yang baik tidak langsung coding.</p>${ordered([
      "memahami masalah",
      "menggambar alur",
      "merancang data",
      "merancang class",
      "baru mulai coding"
    ])}${tags(["Flowchart", "ER Diagram", "Class Diagram", "Mini SRS"])}`
  },
  {
    className: "case-study-divider",
    skipStory: true,
    html: `
      <div class="case-study-copy">
        <p class="kicker">Studi Kasus Dimulai</p>
        <h2>Cooking Gallery</h2>
        <p class="subtitle">Sekarang kita ubah semua konsep tadi menjadi website resep yang nyata.</p>
        <p>Bayangkan kita membuat galeri resep kecil: ada pengunjung, user yang menulis resep, komentar, kategori, dan admin yang menjaga kualitas isi website.</p>
        ${tags(["website resep", "PHP + MySQL", "OOP", "login", "admin approval", "security dasar"])}
      </div>
      <figure class="case-study-visual">
        <img src="assets/images/case-study-cooking-gallery.png" alt="Ilustrasi studi kasus Cooking Gallery dengan laptop berisi website resep">
      </figure>
    `
  },
  {
    title: "Cooking Gallery",
    html: `<p>Cooking Gallery adalah website sederhana untuk berbagi resep masakan.</p>${cards([
      { title: "User bisa", body: "register, login, menulis resep, memberi komentar" },
      { title: "Admin bisa", body: "approve user, approve resep, approve komentar, manage kategori" }
    ])}`
  },
  {
    title: "Siapa Saja User-nya?",
    html: `${table(["User Type", "Bisa Melakukan"], [
      ["Visitor", "Lihat resep, lihat kategori, register, login"],
      ["Registered User", "Submit resep, komentar, edit profil"],
      ["Admin", "Approve user, approve resep, approve komentar, manage kategori"]
    ])}${callout("Tidak semua user punya hak yang sama.")}`
  },
  {
    title: "Layout Public Website",
    html: `${tree(`+------------------------------------------------+
| Cooking Gallery                 Login Register |
+------------------------------------------------+
| Categories     | Latest Recipes                |
| - Breakfast    | [Recipe] [Recipe] [Recipe]    |
| - Lunch        | [Recipe] [Recipe] [Recipe]    |
| - Dinner       | [Recipe] [Recipe] [Recipe]    |
| - Dessert      |                                |
+------------------------------------------------+
| Copyright Cooking Gallery                      |
+------------------------------------------------+`)}<p>Desain dibuat sederhana seperti website resep biasa.</p>`
  },
  {
    title: "Area User",
    html: `${code("text", `/user/dashboard.php
/user/new-recipe.php
/user/my-recipes.php
/user/profile.php`)}${list([
      "melihat resep sendiri",
      "menulis resep baru",
      "edit profil",
      "melihat status resep"
    ])}${code("text", "pending -> approved / rejected")}`
  },
  {
    title: "Area Admin",
    html: `${code("text", `/admin/index.php
/admin/users.php
/admin/recipes.php
/admin/comments.php
/admin/categories.php`)}${list([
      "approve user baru",
      "approve resep",
      "approve komentar",
      "manage kategori",
      "manage user"
    ])}`
  },
  {
    title: "Flow Register User",
    html: `${diagram(`flowchart TD
    A[Visitor membuka halaman Register] --> B[Mengisi username, email, password]
    B --> C{Data valid?}
    C -- Tidak --> D[Tampilkan error]
    D --> B
    C -- Ya --> E[Simpan user ke database]
    E --> F[Status user = pending]
    F --> G[Admin review user]
    G --> H{Admin approve?}
    H -- Ya --> I[Status user = approved]
    H -- Tidak --> J[Status user = rejected]
    I --> K[User bisa login]`)}${callout("User baru tidak langsung aktif. Admin harus approve terlebih dahulu.")}`
  },
  {
    title: "Flow Submit Recipe",
    html: diagram(`flowchart TD
    A[User login] --> B[Buka halaman New Recipe]
    B --> C[Isi data resep]
    C --> D{Data valid?}
    D -- Tidak --> E[Tampilkan error]
    E --> C
    D -- Ya --> F[Simpan resep ke database]
    F --> G[Status resep = pending]
    G --> H[Admin review resep]
    H --> I{Admin approve?}
    I -- Ya --> J[Status resep = approved]
    I -- Tidak --> K[Status resep = rejected]
    J --> L[Resep tampil di website publik]`)
  },
  {
    title: "Flow Comment",
    html: diagram(`flowchart TD
    A[User login] --> B[Buka detail resep]
    B --> C[Tulis komentar]
    C --> D{Komentar valid?}
    D -- Tidak --> E[Tampilkan error]
    E --> C
    D -- Ya --> F[Simpan komentar]
    F --> G[Status komentar = pending]
    G --> H[Admin review komentar]
    H --> I{Admin approve?}
    I -- Ya --> J[Komentar tampil]
    I -- Tidak --> K[Komentar ditolak]`)
  },
  {
    title: "ER Diagram Cooking Gallery",
    html: diagram(`erDiagram
    USERS ||--o{ RECIPES : writes
    USERS ||--o{ COMMENTS : writes
    CATEGORIES ||--o{ RECIPES : contains
    RECIPES ||--o{ COMMENTS : has
    USERS {
        int id PK
        string username
        string email
        string password_hash
        string display_name
        string avatar
        string role
        string status
        datetime created_at
    }
    CATEGORIES {
        int id PK
        string name
        string slug
    }
    RECIPES {
        int id PK
        int user_id FK
        int category_id FK
        string title
        string slug
        text description
        text ingredients
        string cooking_type
        string difficulty
        int cooking_time_minutes
        string image
        string status
        datetime created_at
        datetime updated_at
    }
    COMMENTS {
        int id PK
        int recipe_id FK
        int user_id FK
        text body
        string status
        datetime created_at
    }`)
  },
  {
    title: "Membaca ER Diagram",
    html: `${table(["Relasi", "Artinya"], [
      ["User -> Recipes", "Satu user bisa menulis banyak resep"],
      ["User -> Comments", "Satu user bisa menulis banyak komentar"],
      ["Category -> Recipes", "Satu kategori punya banyak resep"],
      ["Recipe -> Comments", "Satu resep punya banyak komentar"]
    ])}${callout("Foreign key digunakan untuk menghubungkan table.")}`
  },
  {
    title: "Class Diagram Cooking Gallery",
    html: diagram(`classDiagram
    class Database {
        -connection
        +connect()
        +getConnection()
    }
    class User {
        -db
        +register(username, email, password)
        +findById(id)
        +findByUsername(username)
        +approveUser(id)
        +rejectUser(id)
        +updateProfile(id, data)
    }
    class Auth {
        -db
        +login(username, password)
        +logout()
        +check()
        +user()
        +isAdmin()
    }
    class Recipe {
        -db
        +create(userId, data)
        +getLatestApproved(limit)
        +getBySlug(slug)
        +getByUser(userId)
        +approve(id)
        +reject(id)
    }
    class Comment {
        -db
        +create(recipeId, userId, body)
        +getApprovedByRecipe(recipeId)
        +approve(id)
        +reject(id)
    }
    class Category {
        -db
        +getAll()
        +getBySlug(slug)
        +create(name)
    }
    class Validator {
        +required(value)
        +email(value)
        +minLength(value, length)
        +number(value)
        +inArray(value, allowedValues)
    }
    Database <.. User
    Database <.. Auth
    Database <.. Recipe
    Database <.. Comment
    Database <.. Category
    Validator <.. User
    Validator <.. Recipe
    Validator <.. Comment`)
  },
  {
    title: "Mini SRS",
    html: `<p>SRS adalah <strong>Software Requirements Specification</strong>. Sederhananya, SRS adalah dokumen yang menjelaskan aplikasi mau dibuat seperti apa.</p>${list([
      "Nama aplikasi: Cooking Gallery",
      "Tujuan: website berbagi resep sederhana",
      "User: Visitor, Registered User, Admin",
      "Teknologi: PHP, MySQL, HTML, CSS, vanilla JS",
      "Framework: tidak menggunakan framework",
      "Environment: XAMPP lokal"
    ])}`
  },
  {
    title: "Functional Requirements",
    html: list([
      "FR-001 Visitor dapat melihat homepage",
      "FR-002 Visitor dapat register",
      "FR-003 User dapat login",
      "FR-004 User dapat membuat resep",
      "FR-005 User dapat memberi komentar",
      "FR-006 Admin dapat approve user",
      "FR-007 Admin dapat approve resep",
      "FR-008 Admin dapat approve komentar",
      "FR-009 Public dapat melihat detail resep"
    ])
  },
  {
    title: "Non-Functional Requirements",
    html: list([
      "Aplikasi harus sederhana untuk pemula",
      "Menggunakan vanilla PHP",
      "Menggunakan MySQL",
      "Menggunakan PDO",
      "Password harus di-hash",
      "Query harus memakai prepared statement",
      "Output harus diamankan dengan <code>htmlspecialchars()</code>",
      "PHP di template harus minimal",
      "Query database harus berada di dalam class"
    ])
  },
  {
    className: "chapter",
    html: `<p class="kicker">Chapter Praktik</p><h2>Mulai Praktik</h2><p>Kita belum langsung membuat login atau resep. Pertama kita belajar fondasi project.</p>${tags(["struktur folder", "file PHP", "include", "config", "bootstrap", "koneksi MySQL"])}`
  },
  {
    title: "Setup Project di XAMPP",
    html: `${ordered([
      "Buka folder XAMPP.",
      "Masuk ke folder <code>htdocs</code>.",
      "Buat folder baru <code>cooking-gallery</code>."
    ])}${code("text", `C:\\xampp\\htdocs\\cooking-gallery

http://localhost/cooking-gallery`)}`
  },
  {
    title: "Struktur Folder Awal",
    html: `${tree(`cooking-gallery/
|
+-- index.php
+-- includes/
|   +-- config.php
|   +-- bootstrap.php
|   +-- header.php
|   +-- footer.php
+-- assets/
    +-- css/
    |   +-- style.css
    +-- js/
        +-- app.js`)}${callout("Setiap file punya tugas sendiri supaya project mudah dirawat.")}`
  },
  {
    title: "Apa Itu PHP?",
    html: `<p>PHP adalah bahasa pemrograman yang berjalan di server. HTML tampil di browser, PHP membantu membuat HTML secara dinamis.</p>${code("php", `<?php
echo "Halo dari PHP!";
?>`)}${list(["<code>&lt;?php</code> artinya mulai menulis PHP", "<code>echo</code> artinya tampilkan teks", "<code>?&gt;</code> artinya selesai menulis PHP"])}`
  },
  {
    title: "PHP + HTML",
    html: `${code("php", `<!DOCTYPE html>
<html>
<head>
    <title>Belajar PHP</title>
</head>
<body>
    <h1>Cooking Gallery</h1>

    <?php
    echo "Selamat datang di website resep masakan!";
    ?>
</body>
</html>`)}${callout("HTML membuat struktur halaman. PHP membuat isi halaman menjadi dinamis.")}`
  },
  {
    title: "Apakah PHP Harus Ditutup Dengan ?>",
    html: `<p>Untuk pemula, kita boleh memahami bentuk lengkap:</p>${code("php", `<?php
echo "Halo";
?>`)}<p>Kalau file hanya berisi PHP saja, biasanya <code>?&gt;</code> di akhir file tidak wajib ditulis.</p>${code("php", `<?php

$siteName = "Cooking Gallery";`)}${callout("Tujuannya supaya tidak ada spasi kosong yang tidak sengaja muncul setelah PHP ditutup.")}`
  },
  {
    title: "Apa Itu Include?",
    html: `<p><code>include</code> dan <code>require</code> digunakan untuk memanggil file PHP lain.</p>${code("php", `include 'includes/header.php';
include 'includes/footer.php';

require_once 'includes/bootstrap.php';`)}${callout("Daripada menulis header dan footer berulang-ulang, kita buat satu file lalu dipakai di banyak halaman.")}`
  },
  {
    title: "config.php",
    html: `${code("php", `<?php

define('APP_NAME', 'Cooking Gallery');
define('APP_URL', 'http://localhost/cooking-gallery');

define('DB_HOST', 'localhost');
define('DB_NAME', 'cooking_gallery');
define('DB_USER', 'root');
define('DB_PASS', '');`)}${callout("<code>config.php</code> menyimpan pengaturan aplikasi. Kalau nama database berubah, kita cukup ubah di satu tempat.")}`
  },
  {
    title: "Membuat Database",
    html: `${ordered([
      "Buka XAMPP Control Panel.",
      "Start Apache.",
      "Start MySQL.",
      "Buka <code>http://localhost/phpmyadmin</code>.",
      "Buat database baru."
    ])}${code("sql", "CREATE DATABASE cooking_gallery;")}`
  },
  {
    title: "bootstrap.php",
    html: `${code("php", `<?php

require_once __DIR__ . '/config.php';

session_start();

try {
    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}`)}${callout("<code>bootstrap.php</code> memuat config, memulai session, dan menghubungkan PHP ke MySQL.")}`
  },
  {
    title: "Header Bukan Tempat Logic",
    html: `<p>Jangan taruh koneksi database di <code>header.php</code>.</p>${tree(`bootstrap.php -> config, session, database
header.php    -> tampilan bagian atas
footer.php    -> tampilan bagian bawah`)}${callout("Tampilan dan logic sebaiknya dipisah.")}`
  },
  {
    title: "header.php",
    html: code("php", `<?php
$pageTitle = $pageTitle ?? APP_NAME;
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($pageTitle) ?> - <?= APP_NAME ?></title>
    <link rel="stylesheet" href="<?= APP_URL ?>/assets/css/style.css">
</head>
<body>
<header class="site-header">
    <div class="container">
        <h1 class="logo"><a href="<?= APP_URL ?>">Cooking Gallery</a></h1>
        <nav class="top-nav">
            <a href="<?= APP_URL ?>">Home</a>
            <a href="<?= APP_URL ?>/login.php">Login</a>
            <a href="<?= APP_URL ?>/register.php">Register</a>
        </nav>
    </div>
</header>
<main class="site-main">
    <div class="container">`)
  },
  {
    title: "Kenapa Ada htmlspecialchars()?",
    html: `${code("php", "<?= htmlspecialchars($pageTitle) ?>")}${callout("Sebelum teks ditampilkan ke HTML, kita amankan dulu. Ini membantu mencegah XSS.")}<p><code>&lt;?= APP_URL ?&gt;</code> adalah short echo tag, sama seperti <code>&lt;?php echo APP_URL; ?&gt;</code>.</p>`
  },
  {
    title: "footer.php",
    html: code("php", `    </div>
</main>

<footer class="site-footer">
    <div class="container">
        <p>&copy; <?= date('Y') ?> Cooking Gallery. All rights reserved.</p>
    </div>
</footer>

<script src="<?= APP_URL ?>/assets/js/app.js"></script>
</body>
</html>`)
  },
  {
    title: "index.php",
    html: `${code("php", `<?php

require_once __DIR__ . '/includes/bootstrap.php';

$pageTitle = 'Home';

include __DIR__ . '/includes/header.php';
?>

<h2>Selamat Datang di Cooking Gallery</h2>
<p>Cooking Gallery adalah website sederhana untuk berbagi resep masakan.</p>

<section class="recipe-grid">
    <article class="recipe-card">
        <h3>Nasi Goreng Sederhana</h3>
        <p>Resep nasi goreng mudah untuk pemula.</p>
    </article>
    <article class="recipe-card">
        <h3>Telur Dadar Keju</h3>
        <p>Menu cepat, mudah, dan enak.</p>
    </article>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>`)}`
  },
  {
    title: "Membuat style.css",
    html: code("css", `body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: #faf7f2;
    color: #333;
}
.container {
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
}
.site-header {
    background: #8b3a2b;
    color: white;
    padding: 16px 0;
}
.recipe-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
}
.recipe-card {
    background: white;
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
}`)
  },
  {
    title: "Membuat app.js",
    html: `${code("js", `console.log("Cooking Gallery loaded");`)}<p>Untuk sekarang JavaScript belum banyak dipakai. Kita hanya menyiapkan file-nya dulu.</p>`
  },
  {
    title: "Testing",
    html: `${list([
      "Apache sudah jalan",
      "MySQL sudah jalan",
      "database <code>cooking_gallery</code> sudah dibuat",
      "buka <code>http://localhost/cooking-gallery</code>"
    ])}${callout("Hasil yang diharapkan: halaman tampil, header tampil, recipe cards tampil, footer tampil, dan tidak ada database error.")}`
  },
  {
    title: "Apa yang Sudah Kita Pelajari?",
    html: list([
      "File PHP memakai ekstensi <code>.php</code>",
      "PHP dimulai dengan <code>&lt;?php</code>",
      "PHP bisa dicampur dengan HTML",
      "<code>include</code> membuat file bisa dipakai ulang",
      "<code>config.php</code> menyimpan pengaturan",
      "<code>bootstrap.php</code> menyiapkan aplikasi",
      "PDO dipakai untuk koneksi PHP ke MySQL"
    ])
  },
  {
    className: "chapter",
    html: `<p class="kicker">Database Implementation</p><h2>Membuat Table Database</h2><p>Table yang dibutuhkan sesuai entity yang sudah kita rancang.</p>${tags(["users", "categories", "recipes", "comments"])}`
  },
  {
    title: "Table users",
    html: code("sql", `CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    display_name VARCHAR(100),
    avatar VARCHAR(255),
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
  },
  {
    title: "Table categories",
    html: `${code("sql", `CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)}${code("sql", `INSERT INTO categories (name, slug) VALUES
('Breakfast', 'breakfast'),
('Lunch', 'lunch'),
('Dinner', 'dinner'),
('Dessert', 'dessert'),
('Traditional Food', 'traditional-food'),
('Drinks', 'drinks');`)}`
  },
  {
    title: "Table recipes",
    html: code("sql", `CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    category_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(180) NOT NULL UNIQUE,
    description TEXT,
    ingredients TEXT NOT NULL,
    cooking_type VARCHAR(100),
    difficulty ENUM('easy', 'medium', 'hard') NOT NULL DEFAULT 'easy',
    cooking_time_minutes INT NOT NULL,
    image VARCHAR(255),
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL,
    CONSTRAINT fk_recipes_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_recipes_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
  },
  {
    title: "Table comments",
    html: code("sql", `CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    user_id INT NOT NULL,
    body TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_comments_recipe FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
  },
  {
    className: "chapter",
    skipStory: true,
    html: `
      <p class="kicker">Bagian PHP Classes</p>
      <h2>Membuat Class di PHP</h2>
      <p>Sekarang rancangan class mulai berubah menjadi file PHP sungguhan.</p>
      ${tags(["class", "property", "constructor", "method", "object"])}
    `
  },
  {
    title: "Bentuk Dasar Class PHP",
    html: `
      <p>Class adalah cetakan. Di PHP, cetakan itu ditulis dengan kata <code>class</code>, lalu diberi nama.</p>
      ${code("php", `<?php

class CookieMold
{
    // Isi class ditulis di dalam kurung kurawal ini.
}`)}
      ${callout("Nama class biasanya memakai huruf besar di awal, misalnya <code>CookieMold</code>, <code>User</code>, atau <code>Recipe</code>.")}
    `
  },
  {
    title: "Isi Class: Property",
    html: `
      <p>Property adalah data yang dimiliki class. Kalau cetakan kue punya bahan dan bentuk, class juga bisa punya data di dalamnya.</p>
      ${code("php", `class CookieMold
{
    private string $material = 'metal';
    private string $shape = 'gingerbread';
}`)}
      ${table(["Bagian", "Artinya"], [
        ["<code>private</code>", "Data ini hanya boleh dipakai dari dalam class."],
        ["<code>string</code>", "Tipe datanya adalah teks."],
        ["<code>$material</code>", "Nama property."],
        ["<code>'metal'</code>", "Nilai awal property."]
      ])}
    `
  },
  {
    title: "Constructor: Saat Object Dibuat",
    html: `
      <p>Constructor adalah method khusus yang otomatis berjalan saat object baru dibuat.</p>
      ${code("php", `class CookieMold
{
    private string $shape;

    public function __construct(string $shape)
    {
        $this->shape = $shape;
    }
}`)}
      ${callout("<code>$this</code> artinya: object ini sendiri. Jadi <code>$this->shape</code> berarti property <code>shape</code> milik object ini.")}
    `
  },
  {
    title: "Method dan Object",
    html: `
      <p>Method adalah aksi. Setelah class punya data, class juga bisa punya aksi yang memakai data itu.</p>
      ${code("php", `class CookieMold
{
    private string $shape;

    public function __construct(string $shape)
    {
        $this->shape = $shape;
    }

    public function makeCookie(): string
    {
        return 'Membuat kue bentuk ' . $this->shape;
    }
}

$mold = new CookieMold('gingerbread');
echo $mold->makeCookie();`)}
      ${callout("<code>new CookieMold(...)</code> membuat object baru dari class <code>CookieMold</code>.")}
    `
  },
  {
    title: "Folder classes",
    html: `${tree(`classes/
+-- Database.php
+-- User.php
+-- Auth.php
+-- Recipe.php
+-- Comment.php
+-- Category.php
+-- Validator.php`)}${callout("Setiap class punya tanggung jawab sendiri.")}`
  },
  {
    title: "Database Class",
    html: code("php", `<?php

class Database
{
    private PDO $connection;

    public function __construct()
    {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $this->connection = new PDO($dsn, DB_USER, DB_PASS);
        $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
    }

    public function getConnection(): PDO
    {
        return $this->connection;
    }
}`)
  },
  {
    title: "Update bootstrap.php",
    html: `${code("php", `<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/../classes/Database.php';

session_start();

$database = new Database();
$pdo = $database->getConnection();`)}${callout("Sekarang koneksi database dibuat melalui class <code>Database</code>.")}`
  },
  {
    title: "Validator Class",
    html: `${code("php", `<?php

class Validator
{
    public static function required($value): bool
    {
        return trim($value) !== '';
    }

    public static function email($value): bool
    {
        return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
    }

    public static function minLength($value, $length): bool
    {
        return strlen($value) >= $length;
    }
}`)}${callout("Jangan percaya input user tanpa validasi.")}`
  },
  {
    title: "Category Class",
    html: code("php", `class Category
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getAll(): array
    {
        $stmt = $this->db->query("SELECT * FROM categories ORDER BY name ASC");
        return $stmt->fetchAll();
    }
}`)
  },
  {
    title: "Recipe Class",
    html: code("php", `class Recipe
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function getLatestApproved(int $limit = 10): array
    {
        $stmt = $this->db->prepare("
            SELECT recipes.*, users.display_name, categories.name AS category_name
            FROM recipes
            JOIN users ON users.id = recipes.user_id
            JOIN categories ON categories.id = recipes.category_id
            WHERE recipes.status = 'approved'
            ORDER BY recipes.created_at DESC
            LIMIT ?
        ");
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }
}`)
  },
  {
    title: "Homepage dari Database",
    html: code("php", `<?php
require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/classes/Recipe.php';

$pageTitle = 'Home';
$recipeObj = new Recipe($pdo);
$recipes = $recipeObj->getLatestApproved(10);

include __DIR__ . '/includes/header.php';
?>

<h2>Resep Terbaru</h2>
<section class="recipe-grid">
    <?php foreach ($recipes as $recipe): ?>
        <article class="recipe-card">
            <h3><?= htmlspecialchars($recipe['title']) ?></h3>
            <p><?= htmlspecialchars($recipe['description']) ?></p>
            <p><?= htmlspecialchars($recipe['difficulty']) ?> |
               <?= (int) $recipe['cooking_time_minutes'] ?> menit</p>
        </article>
    <?php endforeach; ?>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>`)
  },
  {
    title: "Register User",
    html: `${list([
      "username wajib",
      "email wajib dan valid",
      "password minimal 6 karakter",
      "password harus di-hash",
      "status awal user = pending"
    ])}${code("php", "password_hash($password, PASSWORD_DEFAULT);")}`
  },
  {
    title: "User::register()",
    html: code("php", `public function register(string $username, string $email, string $password): bool
{
    $passwordHash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $this->db->prepare("
        INSERT INTO users (username, email, password_hash, display_name, status)
        VALUES (?, ?, ?, ?, 'pending')
    ");

    return $stmt->execute([
        $username,
        $email,
        $passwordHash,
        $username
    ]);
}`)
  },
  {
    title: "Login",
    html: `${list([
      "username harus ada",
      "password harus benar",
      "status user harus approved"
    ])}${code("php", `password_verify($password, $user['password_hash']);

$_SESSION['user_id'] = $user['id'];`)}`
  },
  {
    title: "Auth Class",
    html: code("php", `class Auth
{
    private PDO $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function check(): bool
    {
        return isset($_SESSION['user_id']);
    }

    public function logout(): void
    {
        session_destroy();
    }

    public function isAdmin(): bool
    {
        return isset($_SESSION['role']) && $_SESSION['role'] === 'admin';
    }
}`)
  },
  {
    title: "Melindungi Halaman",
    html: `${code("php", `if (!$auth->check()) {
    header('Location: ' . APP_URL . '/login.php');
    exit;
}

if (!$auth->isAdmin()) {
    header('Location: ' . APP_URL . '/login.php');
    exit;
}`)}${callout("Tidak semua halaman boleh dibuka semua orang.")}`
  },
  {
    title: "User Dashboard",
    html: `${code("text", `/user/dashboard.php
/user/new-recipe.php
/user/my-recipes.php
/user/profile.php`)}${list([
      "melihat resep sendiri",
      "menulis resep baru",
      "update profil",
      "melihat status approval resep"
    ])}`
  },
  {
    title: "Form New Recipe",
    html: `${tags(["title", "category", "description", "ingredients", "cooking_type", "difficulty", "cooking_time_minutes", "image optional"])}${callout("Setelah submit, status resep adalah <code>pending</code>. Resep belum tampil sebelum admin approve.")}`
  },
  {
    title: "Admin Panel",
    html: `${code("text", `/admin/
/admin/index.php
/admin/users.php
/admin/recipes.php
/admin/comments.php
/admin/categories.php`)}${tags(["approve user", "reject user", "approve recipe", "reject recipe", "approve comment", "reject comment"])}`
  },
  {
    title: "Approval Workflow",
    html: `${code("text", `pending -> approved
pending -> rejected`)}${callout("Approval membuat aplikasi lebih aman dan rapi. Admin menjadi penjaga kualitas konten.")}`
  },
  {
    title: "Comment System",
    html: `${ordered([
      "user login",
      "buka detail resep",
      "tulis komentar",
      "komentar disimpan sebagai pending",
      "admin approve",
      "komentar tampil"
    ])}${callout("Komentar dari user juga perlu diperiksa.")}`
  },
  {
    className: "chapter",
    html: `<p class="kicker">Security Basics</p><h2>Data User Tidak Boleh Langsung Dipercaya</h2>${tags(["Validate input", "Escape output", "Prepared statements", "Sanitize URL slug"])}`
  },
  {
    title: "Validate Input",
    html: `${list([
      "email harus format email",
      "cooking time harus angka",
      "difficulty hanya boleh easy, medium, hard",
      "username tidak boleh kosong",
      "password minimal 6 karakter"
    ])}${callout("Validasi memastikan data masuk akal sebelum disimpan.")}`
  },
  {
    title: "Escape Output",
    html: `${code("php", `// Buruk
echo $comment['body'];

// Lebih aman
echo htmlspecialchars($comment['body'], ENT_QUOTES, 'UTF-8');`)}${callout("Ini membantu mencegah XSS.")}`
  },
  {
    title: "Apa Itu XSS?",
    html: `${code("html", `<script>alert('XSS')</script>`)}${callout("Kalau komentar ini ditampilkan mentah-mentah, browser bisa menjalankan script.")}<p>Jangan tampilkan data user tanpa diamankan.</p>`
  },
  {
    title: "Apa Itu SQL Injection?",
    html: `${code("php", `$sql = "SELECT * FROM users WHERE username = '$username'";`)}${code("text", "' OR '1'='1")}${callout("User jahat bisa menyisipkan SQL ke dalam input.")}`
  },
  {
    title: "Mencegah SQL Injection",
    html: `${code("php", `$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);`)}${callout("Prepared statement memisahkan perintah SQL dari input user.")}`
  },
  {
    title: "URL yang Aman",
    html: `${cards([
      { title: "Title", body: "Nasi Goreng Spesial!" },
      { title: "Slug", body: "nasi-goreng-spesial" }
    ])}${list(["lowercase", "letters", "numbers", "dash only", "no strange symbols", "no script tags"])}`
  },
  {
    title: "Security Lab",
    html: `${tree(`security-lab/
+-- sql-injection-bad.php
+-- sql-injection-fixed.php
+-- xss-bad.php
+-- xss-fixed.php`)}${callout("Security lab hanya untuk belajar di lokal. Jangan upload kode buruk ke production.")}`
  },
  {
    title: "Final Project Structure",
    html: tree(`cooking-gallery/
+-- index.php
+-- recipe.php
+-- category.php
+-- login.php
+-- register.php
+-- logout.php
+-- admin/
|   +-- index.php
|   +-- users.php
|   +-- recipes.php
|   +-- comments.php
|   +-- categories.php
+-- user/
|   +-- dashboard.php
|   +-- new-recipe.php
|   +-- my-recipes.php
|   +-- profile.php
+-- includes/
+-- classes/
+-- assets/
+-- uploads/
+-- security-lab/`)
  },
  {
    title: "Apa yang Sudah Dipelajari?",
    html: list([
      "Apa itu database, table, row, column",
      "Apa itu entity dan relationship",
      "Apa itu class, object, attribute, method",
      "Cara membuat product design sederhana",
      "Cara membaca flowchart, ER Diagram, dan Class Diagram",
      "Cara membuat struktur PHP dan koneksi MySQL",
      "Cara membuat register, login, dan admin approval",
      "Dasar mencegah XSS dan SQL Injection"
    ])
  },
  {
    className: "hero-title",
    html: `<p class="kicker">Closing</p><h2>Coding Bukan Hanya Menulis Perintah</h2>${list([
      "merancang data",
      "merancang alur",
      "mengatur kode",
      "menjaga keamanan",
      "membuat aplikasi yang bisa dipahami manusia lain"
    ])}${callout("Selamat! Kamu sudah memahami pondasi membuat aplikasi web sederhana.")}`
  }
];

const storyNotes = [
  "Bayangkan kita akan membuka galeri resep kecil. Hari ini kita belajar pelan-pelan: dari tempat menyimpan data, lalu cara membuat websitenya hidup.",
  "Perjalanan ini seperti memasak menu baru: kita kenali bahan, susun alat, baru menyalakan kompor dan mulai praktik.",
  "Saat website punya user, resep, dan komentar, semua itu butuh tempat pulang. Tempat pulang data itulah database.",
  "Kata <strong>base</strong> bisa dibayangkan sebagai rumah atau markas. Jadi database adalah rumah tempat data tinggal rapi.",
  "Browser tidak masuk ke gudang data sendiri. Browser menitip pesan ke PHP, lalu PHP mengambilkan data dari MySQL.",
  "Lemari besar adalah database. Di dalamnya ada laci, map, label, dan kartu data. Dari benda sehari-hari ini, konsep table, column, dan row jadi lebih mudah dibayangkan.",
  "Sebelum membuat table, kita bertanya dulu: benda penting apa saja yang muncul di cerita aplikasi kita?",
  "Data itu seperti orang di sebuah keluarga. User, resep, kategori, dan komentar saling kenal karena punya hubungan.",
  "Tidak semua hubungan sama. Ada yang satu-satu, satu-ke-banyak, dan banyak-ke-banyak. Untuk aplikasi resep, kita paling sering memakai satu-ke-banyak.",
  "Setelah tahu jenis hubungan, kita belajar menggambarnya. ER Diagram adalah cara mengubah cerita menjadi peta data.",
  "Mulai dari cerita kecil: Ayah dan Anak. Dari satu Ayah ke banyak Anak, kita bisa melihat bentuk one-to-many.",
  "Lalu kita tambahkan Ibu. Sekarang satu Anak punya lebih dari satu garis hubungan, dan peta data mulai terlihat seperti silsilah.",
  "Garis di ERD nanti berubah menjadi kolom di table. Karena Anak terhubung ke Ayah dan Ibu, table kids menyimpan dad_id dan mom_id.",
  "Family register seperti buku keluarga. Buku ini mengumpulkan catatan siapa saja yang termasuk dalam satu keluarga.",
  "Connector table adalah halaman penghubung. Ia tidak menggantikan Ayah, Ibu, atau Anak, tetapi mencatat siapa terdaftar di buku keluarga.",
  "Setelah paham versi yang mudah dilihat, kita bisa merapikan desain. Ayah, Ibu, dan Anak sama-sama family member, hanya tipenya berbeda.",
  "Kalau database merapikan isi lemari, OOP merapikan cara kita bekerja di dapur kode.",
  "",
  "Class itu seperti cetakan kue. Object adalah kue yang sudah jadi dari cetakan itu.",
  "Setiap benda punya ciri. Cetakan kue punya bahan, bentuk, dan ukuran. Di OOP, ciri seperti itu kita sebut attribute.",
  "Selain punya ciri, benda juga bisa melakukan aksi. Cetakan kue bisa menekan adonan, diangkat, lalu menghasilkan bentuk kue. Di OOP, aksi seperti ini disebut method.",
  "Tidak semua pintu boleh dibuka semua orang. Itulah alasan kita mengenal public dan private.",
  "Sebelum memasak, kita membaca resep. Sebelum coding, kita menggambar alur dan menyiapkan rancangan.",
  "",
  "Sekarang kita beri nama aplikasi kita: Cooking Gallery, tempat orang berbagi resep seperti menempelkan kartu resep di papan dapur.",
  "Di website, setiap orang punya peran. Tamu boleh melihat, user boleh menulis, admin membantu menjaga isi galeri tetap rapi.",
  "Bayangkan halaman depan toko resep: ada rak kategori di samping, lalu kartu resep terbaru di tengah.",
  "Setelah login, user punya meja kerja sendiri untuk menulis dan melihat resepnya.",
  "Admin punya ruang belakang. Di sana admin memeriksa user, resep, komentar, dan kategori.",
  "Register seperti mendaftar menjadi anggota klub resep. Form diisi dulu, lalu admin memeriksa sebelum anggota boleh masuk penuh.",
  "Submit resep seperti menyerahkan kartu resep ke penjaga galeri. Kartu belum ditempel di dinding sampai admin menyetujui.",
  "Komentar juga melewati meja pemeriksaan, supaya ruang diskusi tetap nyaman.",
  "ER Diagram adalah peta keluarga data. Garis-garisnya menunjukkan siapa terhubung dengan siapa.",
  "Foreign key bisa dibayangkan seperti tali kecil yang mengikat satu kartu data ke kartu data lain.",
  "Class diagram adalah peta pembagian tugas di dapur kode: siapa bertugas koneksi, siapa mengurus user, siapa mengurus resep.",
  "Mini SRS adalah catatan janji aplikasi. Kita menulis apa yang akan dibuat supaya tidak tersesat saat coding.",
  "Functional requirement adalah daftar aksi yang harus bisa dilakukan aplikasi.",
  "Non-functional requirement adalah aturan kualitas: aman, sederhana, rapi, dan mudah dipahami.",
  "Sekarang kita masuk dapur praktik. Kita mulai dari meja, alat, dan folder sebelum membuat fitur besar.",
  "Di XAMPP, folder <code>htdocs</code> seperti etalase lokal. Apa yang kita taruh di sana bisa dibuka lewat localhost.",
  "Struktur folder seperti rak dapur. Kalau alat diletakkan rapi, kita tidak bingung saat mencari.",
  "PHP bekerja di belakang layar. Browser melihat hasil HTML, tetapi PHP yang membantu menyiapkan isinya.",
  "PHP dan HTML bisa bekerja dalam satu halaman: HTML membuat bentuk, PHP mengisi bagian yang berubah.",
  "Penutup PHP seperti menutup pintu. Untuk file PHP murni, pintu akhir sering dibiarkan tanpa penutup supaya tidak ada spasi nyasar.",
  "Include seperti memakai komponen yang sama berulang-ulang. Header cukup dibuat sekali, lalu dipanggil di banyak halaman.",
  "Config adalah buku catatan alamat penting: nama aplikasi, alamat website, dan kunci koneksi database.",
  "Sebelum PHP bisa menyimpan resep, kita siapkan dulu rumah datanya di MySQL.",
  "Bootstrap adalah langkah menyalakan aplikasi: baca config, mulai session, lalu sambungkan ke database.",
  "Header fokus pada tampilan atas halaman. Logic berat sebaiknya tinggal di tempat lain supaya rumah kode tidak berantakan.",
  "Header adalah bagian depan website: logo, menu, dan pembuka HTML.",
  "Saat menampilkan tulisan dari data, kita bersihkan dulu. Ini seperti mencuci bahan sebelum dimasak.",
  "Footer menutup halaman, seperti bagian bawah surat yang rapi.",
  "Index adalah halaman pertama yang dilihat pengunjung. Untuk awal, kita pakai kartu resep contoh dulu.",
  "CSS memberi pakaian pada halaman: warna, jarak, grid, dan kartu.",
  "JavaScript kita siapkan seperti alat tambahan. Belum banyak dipakai, tapi tempatnya sudah ada.",
  "Testing adalah mencicipi masakan. Kita cek satu per satu: server hidup, database ada, halaman tampil.",
  "Sampai sini, kita sudah punya pondasi rumah: file, layout, include, config, dan koneksi.",
  "Sekarang kita isi lemari data dengan table yang sesuai cerita aplikasi.",
  "Table users menyimpan kartu anggota: username, email, password aman, role, dan status.",
  "Table categories menyimpan rak kategori resep, seperti Breakfast, Lunch, Dinner, dan Dessert.",
  "Table recipes adalah tempat kartu resep utama disimpan.",
  "Table comments menyimpan percakapan di bawah resep.",
  "",
  "Sebelum menulis class besar, kita kenali dulu bentuk dasarnya. Class di PHP adalah cetakan yang ditulis dengan kata class.",
  "Property adalah data di dalam class. Seperti cetakan kue punya bahan dan bentuk, class punya property untuk menyimpan ciri.",
  "Constructor seperti momen saat cetakan dipilih dan disiapkan. Ia otomatis berjalan ketika object baru dibuat.",
  "Method adalah aksi di dalam class. Setelah object dibuat, kita bisa memanggil aksinya dengan tanda panah.",
  "Folder classes seperti kotak alat khusus. Setiap class memegang satu pekerjaan.",
  "Database class menjadi petugas pembuka pintu ke MySQL.",
  "Bootstrap sekarang lebih rapi karena meminta koneksi lewat class Database.",
  "Validator seperti penjaga pintu form. Ia mengecek apakah data masuk akal sebelum diterima.",
  "Category class mengurus rak kategori resep.",
  "Recipe class mengurus kartu resep: mengambil, membuat, menyetujui, atau menolak.",
  "Homepage dinamis artinya kartu resep tidak ditulis manual lagi, tetapi diambil dari database.",
  "Register adalah proses membuat kartu anggota baru.",
  "Saat register, password tidak disimpan apa adanya. Kita ubah menjadi bentuk hash yang aman.",
  "Login adalah mencocokkan kartu anggota dan password, lalu memastikan statusnya sudah approved.",
  "Auth class adalah petugas keamanan pintu masuk.",
  "Melindungi halaman seperti memasang tanda: hanya user login atau admin yang boleh masuk.",
  "Dashboard adalah meja kerja user setelah berhasil masuk.",
  "Form resep adalah kartu kosong yang diisi user sebelum dikirim ke admin.",
  "Admin panel adalah meja pemeriksaan konten.",
  "Status pending, approved, dan rejected membantu semua orang tahu posisi data.",
  "Komentar juga bagian dari galeri. Karena ditulis user, komentar perlu dijaga.",
  "Security dimulai dari kebiasaan sederhana: jangan percaya input mentah.",
  "Validasi mengecek apakah data masuk akal sebelum masuk ke database.",
  "Escape output membuat tulisan user aman saat tampil di browser.",
  "XSS seperti menyelipkan kertas berisi perintah aneh ke papan komentar. Browser bisa tertipu kalau kita tidak hati-hati.",
  "SQL Injection seperti user mencoba bicara langsung ke lemari database dengan kalimat berbahaya.",
  "Prepared statement membuat input user tetap menjadi data, bukan berubah menjadi perintah SQL.",
  "Slug adalah nama jalan yang rapi untuk sebuah resep.",
  "Security lab adalah tempat latihan aman. Kita melihat contoh buruk hanya di lokal supaya tahu cara memperbaikinya.",
  "Di akhir, bentuk project sudah seperti rumah lengkap: ruang publik, ruang user, ruang admin, classes, uploads, dan security lab.",
  "Yang penting bukan hafal semua kode, tetapi mengerti cerita di baliknya.",
  "Coding adalah cara merapikan ide supaya bisa dipakai orang lain."
];

const container = document.getElementById("slides");

container.innerHTML = slides.map((slide, index) => {
  const heading = slide.title ? `<h2>${slide.title}</h2>` : "";
  const className = slide.className ? ` class="${slide.className}"` : "";
  const isTopicChange = ["hero-title", "chapter", "case-study-divider"].some((name) =>
    slide.className?.split(" ").includes(name)
  );
  const transition = slide.transition ?? (isTopicChange ? "zoom" : "");
  const transitionAttr = transition ? ` data-transition="${transition}"` : "";
  const story = !slide.skipStory && storyNotes[index] ? storyBox(storyNotes[index]) : "";
  return `<section${className}${transitionAttr} data-slide="${index + 1}"><div class="slide-inner">${heading}${story}${slide.html}</div></section>`;
}).join("");

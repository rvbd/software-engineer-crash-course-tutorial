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
    title: "Target Akhir Struktur App",
    html: `${tree(`cooking-gallery/
|
+-- index.php
+-- recipe.php
+-- category.php
+-- register.php
+-- login.php
+-- logout.php
+-- seed-admin.php        (sementara, nanti dihapus)
+-- includes/
|   +-- config.php
|   +-- bootstrap.php
|   +-- header.php
|   +-- footer.php
+-- classes/
|   +-- Database.php
|   +-- Validator.php
|   +-- User.php
|   +-- Auth.php
|   +-- Category.php
|   +-- Recipe.php
|   +-- Comment.php
+-- user/
+-- admin/
+-- assets/
+-- uploads/
+-- security-lab/`)}${callout("Kita tidak membuat semuanya sekaligus. Ini peta tujuan, supaya setiap file yang muncul nanti punya konteks.")}`
  },
  {
    title: "Alur Saat Browser Membuka index.php",
    html: `${diagram(`flowchart TD
    A[Browser buka /index.php] --> B[index.php]
    B --> C[require includes/bootstrap.php]
    C --> D[config.php: APP_URL, DB_HOST, DB_NAME]
    C --> E[session_start]
    C --> F[buat koneksi PDO]
    B --> G[set pageTitle]
    B --> H[include header.php]
    H --> I[tampilkan HTML pembuka dan menu]
    B --> J[tampilkan isi halaman]
    B --> K[include footer.php]`)}${callout("Jadi <code>index.php</code> adalah halaman utama, sedangkan <code>bootstrap.php</code> adalah langkah menyalakan aplikasi.")}`
  },
  {
    title: "Pola Setiap Halaman PHP",
    html: `${code("php", `<?php
require_once __DIR__ . '/includes/bootstrap.php';

$pageTitle = 'Judul Halaman';

include __DIR__ . '/includes/header.php';
?>

<!-- isi halaman di sini -->

<?php include __DIR__ . '/includes/footer.php'; ?>`)}${callout("Untuk file di folder <code>user</code> atau <code>admin</code>, path-nya naik satu folder: <code>__DIR__ . '/../includes/bootstrap.php'</code>.")}`
  },
  {
    title: "Siapa Memanggil Siapa?",
    html: `${table(["File", "Tugas"], [
      ["<code>index.php</code>", "Halaman yang diminta browser. Menentukan data dan tampilan yang dibutuhkan."],
      ["<code>bootstrap.php</code>", "Menyiapkan config, session, class penting, dan koneksi database."],
      ["<code>header.php</code>", "Membuka HTML, menampilkan menu, dan mulai area konten."],
      ["<code>footer.php</code>", "Menutup area konten, menampilkan footer, dan memuat JavaScript."],
      ["<code>classes/*.php</code>", "Tempat query dan logic aplikasi supaya halaman tidak terlalu penuh."]
    ])}${callout("Kita sengaja membuat halaman memanggil bootstrap secara eksplisit, supaya alurnya terlihat jelas untuk pemula.")}`
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
+-- classes/
+-- user/
+-- admin/
+-- uploads/
+-- security-lab/
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
    $dataSourceName = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $databaseConnection = new PDO($dataSourceName, DB_USER, DB_PASS);
    $databaseConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $databaseConnection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $databaseException) {
    die('Database connection failed: ' . $databaseException->getMessage());
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
    html: code("sql", `CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`)
  },
  {
    title: "Seed Data: categories",
    html: `${code("sql", `INSERT INTO categories (name, slug) VALUES
('Breakfast', 'breakfast'),
('Lunch', 'lunch'),
('Dinner', 'dinner'),
('Dessert', 'dessert'),
('Traditional Food', 'traditional-food'),
('Drinks', 'drinks');`)}${callout("Seed data adalah data awal. Tanpa kategori, form resep nanti tidak punya pilihan kategori.")}`
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
    title: "Test Database Milestone",
    html: `${ordered([
      "Buka <code>http://localhost/phpmyadmin</code>.",
      "Pilih database <code>cooking_gallery</code>.",
      "Pastikan table <code>users</code>, <code>categories</code>, <code>recipes</code>, dan <code>comments</code> ada.",
      "Klik table <code>categories</code> dan pastikan data awal sudah masuk."
    ])}${callout("Kalau table gagal dibuat, baca pesan error SQL-nya dulu. Biasanya typo nama column, koma tertinggal, atau urutan table salah.")}`
  },
  {
    title: "seed-admin.php Sementara",
    html: `${code("php", `<?php
require_once __DIR__ . '/includes/bootstrap.php';

$username = 'admin';
$email = 'admin@example.com';
$passwordHash = password_hash('admin123', PASSWORD_DEFAULT);

$adminUserStatement = $databaseConnection->prepare("
    INSERT INTO users (username, email, password_hash, display_name, role, status)
    VALUES (?, ?, ?, 'Admin', 'admin', 'approved')
    ON DUPLICATE KEY UPDATE
        password_hash = VALUES(password_hash),
        role = 'admin',
        status = 'approved'
");

$adminUserStatement->execute([$username, $email, $passwordHash]);

echo 'Admin siap. Username: admin, Password: admin123';`)}${callout("File ini hanya untuk lokal. Setelah admin berhasil dibuat, hapus <code>seed-admin.php</code>. Jangan upload ke hosting.")}`
  },
  {
    title: "Test First Admin",
    html: `${ordered([
      "Buka <code>http://localhost/cooking-gallery/seed-admin.php</code>.",
      "Pastikan muncul pesan admin siap.",
      "Buka table <code>users</code> di phpMyAdmin.",
      "Pastikan user <code>admin</code> punya role <code>admin</code> dan status <code>approved</code>.",
      "Hapus file <code>seed-admin.php</code> setelah dipakai."
    ])}${callout("Kita butuh admin pertama supaya nanti bisa approve user, resep, komentar, dan mengelola kategori.")}`
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
        $dataSourceName = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
        $this->connection = new PDO($dataSourceName, DB_USER, DB_PASS);
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
    title: "Database Class: Dari Mana DB_HOST?",
    html: `
      <p><code>DB_HOST</code>, <code>DB_NAME</code>, <code>DB_USER</code>, dan <code>DB_PASS</code> bukan variable bawaan PHP. Itu constant yang kita buat sendiri di <code>config.php</code>.</p>
      ${code("php", `// includes/config.php
define('DB_HOST', 'localhost');
define('DB_NAME', 'cooking_gallery');
define('DB_USER', 'root');
define('DB_PASS', '');`)}
      ${table(["Constant", "Artinya"], [
        ["<code>DB_HOST</code>", "Alamat server MySQL. Di XAMPP lokal biasanya <code>localhost</code>."],
        ["<code>DB_NAME</code>", "Nama database yang dibuat di phpMyAdmin."],
        ["<code>DB_USER</code>", "Username MySQL. Default XAMPP biasanya <code>root</code>."],
        ["<code>DB_PASS</code>", "Password MySQL. Default XAMPP biasanya kosong."]
      ])}
      ${callout("Agar constant ini dikenal oleh class <code>Database</code>, file <code>config.php</code> harus sudah di-<code>require_once</code> sebelum object <code>Database</code> dibuat.")}
    `
  },
  {
    title: "Kenapa config.php Tidak Di-require di Class?",
    html: `
      <p>Secara teknis, <code>Database.php</code> bisa saja melakukan <code>require_once</code> ke <code>config.php</code>. Tapi kita sengaja memuatnya dari luar, lewat <code>bootstrap.php</code>.</p>
      ${table(["Pilihan", "Efek"], [
        ["<code>require_once</code> di <code>Database.php</code>", "Class menjadi tergantung langsung pada lokasi file config."],
        ["<code>require_once</code> di <code>bootstrap.php</code>", "Bootstrap menjadi satu pintu masuk yang menyiapkan config, session, dan koneksi."]
      ])}
      ${callout("Prinsipnya: class <code>Database</code> fokus membuat koneksi. File <code>bootstrap.php</code> fokus menyiapkan aplikasi sebelum halaman berjalan.")}
    `
  },
  {
    title: "Database Class: Property dan Constructor",
    html: `
      ${code("php", `private PDO $connection;

public function __construct()
{
    $dataSourceName = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $this->connection = new PDO($dataSourceName, DB_USER, DB_PASS);
}`)}
      ${table(["Baris", "Penjelasan"], [
        ["<code>private PDO $connection;</code>", "Class ini punya property private bernama <code>$connection</code>. Isinya harus object <code>PDO</code>."],
        ["<code>__construct()</code>", "Method khusus yang otomatis berjalan saat <code>new Database()</code> dipanggil."],
        ["<code>$dataSourceName = ...</code>", "<em>Data Source Name</em>: string alamat tujuan koneksi. Isinya driver MySQL, host, nama database, dan charset."],
        ["<code>charset=utf8mb4</code>", "Supaya data teks aman untuk karakter lengkap, termasuk emoji dan huruf non-Latin."],
        ["<code>new PDO(...)</code>", "Membuka koneksi dari PHP ke MySQL memakai DSN, username, dan password."]
      ])}
    `
  },
  {
    title: "Apa Itu PDO?",
    html: `
      <p><code>PDO</code> adalah class bawaan PHP untuk berbicara dengan database.</p>
      ${cards([
        { title: "P", body: "PHP" },
        { title: "D", body: "Data" },
        { title: "O", body: "Objects" }
      ], "three")}
      ${code("php", `$this->connection = new PDO($dataSourceName, DB_USER, DB_PASS);`)}
      ${callout("Kalau koneksi berhasil, <code>$this->connection</code> berisi object PDO. Nanti object ini dipakai untuk menjalankan query SQL.")}
    `
  },
  {
    title: "PDO Attribute: Error Mode",
    html: `
      ${code("php", `$this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);`)}
      ${table(["Bagian", "Penjelasan"], [
        ["<code>$this->connection</code>", "Object PDO yang sudah terhubung ke database."],
        ["<code>setAttribute(...)</code>", "Mengubah setting internal PDO."],
        ["<code>PDO::ATTR_ERRMODE</code>", "Setting tentang cara PDO melaporkan error."],
        ["<code>PDO::ERRMODE_EXCEPTION</code>", "Kalau query gagal, PDO akan melempar exception, bukan diam-diam gagal."]
      ])}
      ${callout("Mode exception membuat error database lebih mudah ditemukan saat belajar dan lebih mudah ditangani dengan <code>try/catch</code>.")}
    `
  },
  {
    title: "PDO Attribute: Fetch Mode",
    html: `
      ${code("php", `$this->connection->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);`)}
      <p>Baris ini menentukan bentuk default data saat kita mengambil hasil query.</p>
      ${table(["Mode", "Hasil"], [
        ["Tanpa <code>FETCH_ASSOC</code>", "Data bisa punya index angka dan nama column sekaligus."],
        ["Dengan <code>FETCH_ASSOC</code>", "Data menjadi associative array: key-nya nama column."]
      ])}
      ${code("php", `$recipe['title'];
$recipe['description'];`)}
      ${callout("Dengan <code>PDO::FETCH_ASSOC</code>, kode kita lebih enak dibaca karena memakai nama column, bukan nomor urutan column.")}
    `
  },
  {
    title: "getConnection(): Mengambil Koneksi",
    html: `
      ${code("php", `public function getConnection(): PDO
{
    return $this->connection;
}`)}
      ${table(["Baris", "Penjelasan"], [
        ["<code>public function getConnection()</code>", "Method ini boleh dipanggil dari luar class."],
        ["<code>: PDO</code>", "Return type. Method ini berjanji mengembalikan object PDO."],
        ["<code>return $this->connection;</code>", "Mengirim object koneksi yang tadi dibuat di constructor."]
      ])}
      ${callout("Jadi alurnya: <code>new Database()</code> membuat koneksi, lalu <code>getConnection()</code> mengambil koneksi itu agar bisa dipakai class lain.")}
    `
  },
  {
    title: "Update bootstrap.php",
    html: `${code("php", `<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/../classes/Database.php';

session_start();

$database = new Database();
$databaseConnection = $database->getConnection();`)}${callout("Sekarang koneksi database dibuat melalui class <code>Database</code>.")}`
  },
  {
    title: "bootstrap.php Versi Akhir",
    html: `${code("php", `<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/../classes/Database.php';
require_once __DIR__ . '/../classes/Validator.php';
require_once __DIR__ . '/../classes/User.php';
require_once __DIR__ . '/../classes/Auth.php';
require_once __DIR__ . '/../classes/Category.php';
require_once __DIR__ . '/../classes/Recipe.php';
require_once __DIR__ . '/../classes/Comment.php';

session_start();

$database = new Database();
$databaseConnection = $database->getConnection();`)}${callout("Dengan cara ini, halaman cukup memanggil <code>bootstrap.php</code>. Setelah itu semua class penting sudah dikenal PHP.")}
    `
  },
  {
    title: "Constructor Injection",
    html: `
      <p>Setiap class yang butuh database menerima object <code>PDO</code> dari luar.</p>
      ${code("php", `$recipeObject = new Recipe($databaseConnection);
$userObject = new User($databaseConnection);
$auth = new Auth($databaseConnection);`)}
      ${table(["Kenapa?", "Manfaat"], [
        ["Tidak membuat koneksi sendiri-sendiri", "Satu koneksi dari <code>bootstrap.php</code> dipakai bersama."],
        ["Class lebih jelas kebutuhannya", "Kalau constructor butuh <code>PDO</code>, kita langsung tahu class ini memakai database."],
        ["Lebih mudah dirawat", "Setting koneksi tetap di satu tempat."]
      ])}
    `
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
    title: "User Class: Register dan Login Data",
    html: code("php", `class User
{
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function findByUsername(string $username): ?array
    {
        $userLookupStatement = $this->databaseConnection->prepare("SELECT * FROM users WHERE username = ?");
        $userLookupStatement->execute([$username]);
        $user = $userLookupStatement->fetch();

        return $user ?: null;
    }

    public function register(string $username, string $email, string $password): bool
    {
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);

        $createUserStatement = $this->databaseConnection->prepare("
            INSERT INTO users (username, email, password_hash, display_name, status)
            VALUES (?, ?, ?, ?, 'pending')
        ");

        return $createUserStatement->execute([$username, $email, $passwordHash, $username]);
    }
}`)
  },
  {
    title: "User Class: Admin Moderation",
    html: code("php", `public function getAll(): array
{
    return $this->databaseConnection->query("SELECT * FROM users ORDER BY created_at DESC")->fetchAll();
}

public function updateStatus(int $userId, string $status): bool
{
    $updateUserStatusStatement = $this->databaseConnection->prepare("UPDATE users SET status = ? WHERE id = ?");
    return $updateUserStatusStatement->execute([$status, $userId]);
}

public function updateRole(int $userId, string $role): bool
{
    $updateUserRoleStatement = $this->databaseConnection->prepare("UPDATE users SET role = ? WHERE id = ?");
    return $updateUserRoleStatement->execute([$role, $userId]);
}

public function delete(int $userId): bool
{
    $deleteUserStatement = $this->databaseConnection->prepare("DELETE FROM users WHERE id = ?");
    return $deleteUserStatement->execute([$userId]);
}`) 
  },
  {
    title: "Category Class",
    html: code("php", `class Category
{
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function getAll(): array
    {
        $allCategoriesStatement = $this->databaseConnection->query("SELECT * FROM categories ORDER BY name ASC");
        return $allCategoriesStatement->fetchAll();
    }
}`)
  },
  {
    title: "Category Class: CRUD Admin",
    html: code("php", `public function create(string $name, string $slug): bool
{
    $createCategoryStatement = $this->databaseConnection->prepare("INSERT INTO categories (name, slug) VALUES (?, ?)");
    return $createCategoryStatement->execute([$name, $slug]);
}

public function update(int $categoryId, string $name, string $slug): bool
{
    $updateCategoryStatement = $this->databaseConnection->prepare("UPDATE categories SET name = ?, slug = ? WHERE id = ?");
    return $updateCategoryStatement->execute([$name, $slug, $categoryId]);
}

public function delete(int $categoryId): bool
{
    $deleteCategoryStatement = $this->databaseConnection->prepare("DELETE FROM categories WHERE id = ?");
    return $deleteCategoryStatement->execute([$categoryId]);
}`) 
  },
  {
    title: "Recipe Class",
    html: code("php", `class Recipe
{
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function getLatestApproved(int $limit = 10): array
    {
        $approvedRecipesStatement = $this->databaseConnection->prepare("
            SELECT recipes.*, users.display_name, categories.name AS category_name
            FROM recipes
            JOIN users ON users.id = recipes.user_id
            JOIN categories ON categories.id = recipes.category_id
            WHERE recipes.status = 'approved'
            ORDER BY recipes.created_at DESC
            LIMIT ?
        ");
        $approvedRecipesStatement->bindValue(1, $limit, PDO::PARAM_INT);
        $approvedRecipesStatement->execute();
        return $approvedRecipesStatement->fetchAll();
    }
}`)
  },
  {
    title: "Apa Itu Prepared Statement?",
    html: `
      <p><strong>Statement</strong> adalah object PDO yang mewakili query SQL yang sudah disiapkan.</p>
      ${table(["Nama", "Artinya"], [
        ["<code>$approvedRecipesStatement</code>", "Statement untuk mengambil resep yang sudah approved."],
        ["<code>$userLookupStatement</code>", "Statement untuk mencari user."],
        ["<code>$createCommentStatement</code>", "Statement untuk menyimpan komentar baru."],
        ["<code>prepare(...)</code>", "Menyiapkan SQL dan membuat object statement."],
        ["<code>execute()</code>", "Menjalankan statement."],
        ["<code>fetchAll()</code>", "Mengambil semua hasil query."]
      ])}
      ${callout("Di banyak project nyata kamu akan melihat nama pendek <code>$stmt</code>. Di materi ini kita pakai nama yang lebih jelas supaya mudah dibaca.")}
    `
  },
  {
    title: "Alur Prepared Statement",
    html: `${code("php", `$approvedRecipesStatement = $this->databaseConnection->prepare("SELECT * FROM recipes LIMIT ?");
$approvedRecipesStatement->bindValue(1, $limit, PDO::PARAM_INT);
$approvedRecipesStatement->execute();
$recipes = $approvedRecipesStatement->fetchAll();`)}${ordered([
      "<code>prepare()</code>: SQL disiapkan dulu, parameter masih berupa tanda <code>?</code>.",
      "<code>bindValue()</code>: isi tanda <code>?</code> dengan nilai yang aman dan tipe yang jelas.",
      "<code>execute()</code>: query benar-benar dikirim ke database.",
      "<code>fetchAll()</code>: hasil query diambil menjadi array."
    ])}`
  },
  {
    title: "Recipe Class: Detail dan Category",
    html: code("php", `public function findApprovedById(int $recipeId): ?array
{
    $recipeDetailStatement = $this->databaseConnection->prepare("
        SELECT recipes.*, users.display_name, categories.name AS category_name
        FROM recipes
        JOIN users ON users.id = recipes.user_id
        JOIN categories ON categories.id = recipes.category_id
        WHERE recipes.id = ? AND recipes.status = 'approved'
    ");
    $recipeDetailStatement->execute([$recipeId]);
    $recipe = $recipeDetailStatement->fetch();

    return $recipe ?: null;
}

public function getApprovedByCategory(int $categoryId): array
{
    $categoryRecipesStatement = $this->databaseConnection->prepare("
        SELECT * FROM recipes
        WHERE category_id = ? AND status = 'approved'
        ORDER BY created_at DESC
    ");
    $categoryRecipesStatement->execute([$categoryId]);
    return $categoryRecipesStatement->fetchAll();
}`) 
  },
  {
    title: "Recipe Class: Submit dan Moderasi",
    html: code("php", `public function create(array $data): bool
{
    $createRecipeStatement = $this->databaseConnection->prepare("
        INSERT INTO recipes
        (user_id, category_id, title, slug, description, ingredients, cooking_type, difficulty, cooking_time_minutes, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    ");

    return $createRecipeStatement->execute([
        $data['user_id'], $data['category_id'], $data['title'], $data['slug'],
        $data['description'], $data['ingredients'], $data['cooking_type'],
        $data['difficulty'], $data['cooking_time_minutes']
    ]);
}

public function updateStatus(int $recipeId, string $status): bool
{
    $updateRecipeStatusStatement = $this->databaseConnection->prepare("UPDATE recipes SET status = ?, updated_at = NOW() WHERE id = ?");
    return $updateRecipeStatusStatement->execute([$status, $recipeId]);
}`) 
  },
  {
    title: "Recipe Class: Resep Milik User",
    html: code("php", `public function getByUser(int $userId): array
{
    $userRecipesStatement = $this->databaseConnection->prepare("
        SELECT recipes.*, categories.name AS category_name
        FROM recipes
        JOIN categories ON categories.id = recipes.category_id
        WHERE user_id = ?
        ORDER BY created_at DESC
    ");
    $userRecipesStatement->execute([$userId]);
    return $userRecipesStatement->fetchAll();
}

public function delete(int $recipeId): bool
{
    $deleteRecipeStatement = $this->databaseConnection->prepare("DELETE FROM recipes WHERE id = ?");
    return $deleteRecipeStatement->execute([$recipeId]);
}`) 
  },
  {
    title: "Recipe Class: Data Admin",
    html: code("php", `public function getAllForAdmin(): array
{
    return $this->databaseConnection->query("
        SELECT recipes.*, users.username, categories.name AS category_name
        FROM recipes
        JOIN users ON users.id = recipes.user_id
        JOIN categories ON categories.id = recipes.category_id
        ORDER BY recipes.created_at DESC
    ")->fetchAll();
}`) 
  },
  {
    title: "Comment Class",
    html: code("php", `class Comment
{
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function getApprovedByRecipe(int $recipeId): array
    {
        $approvedCommentsStatement = $this->databaseConnection->prepare("
            SELECT comments.*, users.display_name
            FROM comments
            JOIN users ON users.id = comments.user_id
            WHERE recipe_id = ? AND comments.status = 'approved'
            ORDER BY comments.created_at DESC
        ");
        $approvedCommentsStatement->execute([$recipeId]);
        return $approvedCommentsStatement->fetchAll();
    }
}`)
  },
  {
    title: "Comment Class: Submit dan Moderasi",
    html: code("php", `public function create(int $recipeId, int $userId, string $commentBody): bool
{
    $createCommentStatement = $this->databaseConnection->prepare("
        INSERT INTO comments (recipe_id, user_id, body, status)
        VALUES (?, ?, ?, 'pending')
    ");
    return $createCommentStatement->execute([$recipeId, $userId, $commentBody]);
}

public function getAll(): array
{
    return $this->databaseConnection->query("
        SELECT comments.*, recipes.title, users.username
        FROM comments
        JOIN recipes ON recipes.id = comments.recipe_id
        JOIN users ON users.id = comments.user_id
        ORDER BY comments.created_at DESC
    ")->fetchAll();
}

public function updateStatus(int $commentId, string $status): bool
{
    $updateCommentStatusStatement = $this->databaseConnection->prepare("UPDATE comments SET status = ? WHERE id = ?");
    return $updateCommentStatusStatement->execute([$status, $commentId]);
}

public function delete(int $commentId): bool
{
    $deleteCommentStatement = $this->databaseConnection->prepare("DELETE FROM comments WHERE id = ?");
    return $deleteCommentStatement->execute([$commentId]);
}`) 
  },
  {
    title: "Homepage dari Database",
    html: code("php", `<?php
require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/classes/Recipe.php';

$pageTitle = 'Home';
$recipeObject = new Recipe($databaseConnection);
$recipes = $recipeObject->getLatestApproved(10);

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
    title: "recipe.php: Ambil Detail Resep",
    html: code("php", `<?php
require_once __DIR__ . '/includes/bootstrap.php';

$recipeObject = new Recipe($databaseConnection);
$commentObject = new Comment($databaseConnection);

$recipeId = (int) ($_GET['id'] ?? 0);
$recipe = $recipeObject->findApprovedById($recipeId);

if (!$recipe) {
    http_response_code(404);
    die('Resep tidak ditemukan.');
}

$comments = $commentObject->getApprovedByRecipe($recipeId);
$pageTitle = $recipe['title'];

include __DIR__ . '/includes/header.php';`)
  },
  {
    title: "recipe.php: Tampilkan dan Komentar",
    html: code("php", `<h2><?= htmlspecialchars($recipe['title']) ?></h2>
<p><?= htmlspecialchars($recipe['category_name']) ?></p>
<p><?= nl2br(htmlspecialchars($recipe['description'])) ?></p>

<h3>Bahan</h3>
<p><?= nl2br(htmlspecialchars($recipe['ingredients'])) ?></p>

<h3>Komentar</h3>
<?php foreach ($comments as $comment): ?>
    <article class="comment">
        <strong><?= htmlspecialchars($comment['display_name']) ?></strong>
        <p><?= nl2br(htmlspecialchars($comment['body'])) ?></p>
    </article>
<?php endforeach; ?>`)
  },
  {
    title: "recipe.php: Submit Komentar",
    html: `${code("php", `if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $auth = new Auth($databaseConnection);
    $auth->requireLogin();

    $commentBody = trim($_POST['body'] ?? '');

    if (Validator::required($commentBody)) {
        $commentObject->create($recipeId, $_SESSION['user_id'], $commentBody);
        header('Location: ' . APP_URL . '/recipe.php?id=' . $recipeId);
        exit;
    }
}`)}${callout("Komentar baru masuk sebagai <code>pending</code>. Admin harus approve sebelum komentar tampil.")}
    `
  },
  {
    title: "category.php",
    html: code("php", `<?php
require_once __DIR__ . '/includes/bootstrap.php';

$categoryId = (int) ($_GET['id'] ?? 0);
$recipeObject = new Recipe($databaseConnection);
$recipes = $recipeObject->getApprovedByCategory($categoryId);

$pageTitle = 'Kategori';
include __DIR__ . '/includes/header.php';
?>

<h2>Resep Kategori</h2>
<section class="recipe-grid">
    <?php foreach ($recipes as $recipe): ?>
        <article class="recipe-card">
            <h3>
                <a href="<?= APP_URL ?>/recipe.php?id=<?= $recipe['id'] ?>">
                    <?= htmlspecialchars($recipe['title']) ?>
                </a>
            </h3>
            <p><?= htmlspecialchars($recipe['description']) ?></p>
        </article>
    <?php endforeach; ?>
</section>`)
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

    $createUserStatement = $this->databaseConnection->prepare("
        INSERT INTO users (username, email, password_hash, display_name, status)
        VALUES (?, ?, ?, ?, 'pending')
    ");

    return $createUserStatement->execute([
        $username,
        $email,
        $passwordHash,
        $username
    ]);
}`)
  },
  {
    title: "register.php: Proses POST",
    html: code("php", `<?php
require_once __DIR__ . '/includes/bootstrap.php';

$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    if (!Validator::required($username)) $errors[] = 'Username wajib diisi.';
    if (!Validator::email($email)) $errors[] = 'Email tidak valid.';
    if (!Validator::minLength($password, 6)) $errors[] = 'Password minimal 6 karakter.';

    if (!$errors) {
        $userObject = new User($databaseConnection);
        $userObject->register($username, $email, $password);
        header('Location: ' . APP_URL . '/login.php');
        exit;
    }
}`)
  },
  {
    title: "register.php: Form",
    html: code("php", `<form method="post">
    <label>Username</label>
    <input type="text" name="username">

    <label>Email</label>
    <input type="email" name="email">

    <label>Password</label>
    <input type="password" name="password">

    <button type="submit">Register</button>
</form>

<?php if ($errors): ?>
    <ul class="errors">
        <?php foreach ($errors as $error): ?>
            <li><?= htmlspecialchars($error) ?></li>
        <?php endforeach; ?>
    </ul>
<?php endif; ?>`)
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
    private PDO $databaseConnection;

    public function __construct(PDO $databaseConnection)
    {
        $this->databaseConnection = $databaseConnection;
    }

    public function login(string $username, string $password): bool
    {
        $loginUserStatement = $this->databaseConnection->prepare("
            SELECT * FROM users
            WHERE username = ? AND status = 'approved'
        ");
        $loginUserStatement->execute([$username]);
        $user = $loginUserStatement->fetch();

        if (!$user || !password_verify($password, $user['password_hash'])) {
            return false;
        }

        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['role'] = $user['role'];

        return true;
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
    title: "Auth Class: Page Protection",
    html: code("php", `public function requireLogin(): void
{
    if (!$this->check()) {
        header('Location: ' . APP_URL . '/login.php');
        exit;
    }
}

public function requireAdmin(): void
{
    $this->requireLogin();

    if (!$this->isAdmin()) {
        header('Location: ' . APP_URL);
        exit;
    }
}`) 
  },
  {
    title: "login.php",
    html: code("php", `<?php
require_once __DIR__ . '/includes/bootstrap.php';

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $auth = new Auth($databaseConnection);
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    if ($auth->login($username, $password)) {
        header('Location: ' . APP_URL . '/user/dashboard.php');
        exit;
    }

    $error = 'Username, password, atau status user belum benar.';
}

$pageTitle = 'Login';
include __DIR__ . '/includes/header.php';`)
  },
  {
    title: "login.php: Form",
    html: code("php", `<?php if ($error): ?>
    <p class="error"><?= htmlspecialchars($error) ?></p>
<?php endif; ?>

<form method="post">
    <label>Username</label>
    <input type="text" name="username">

    <label>Password</label>
    <input type="password" name="password">

    <button type="submit">Login</button>
</form>`)
  },
  {
    title: "logout.php",
    html: `${code("php", `<?php
require_once __DIR__ . '/includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->logout();

header('Location: ' . APP_URL);
exit;`)}${callout("Setelah logout, session dihancurkan lalu user dikirim kembali ke homepage.")}
    `
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
    title: "user/dashboard.php",
    html: code("php", `<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireLogin();

$recipeObject = new Recipe($databaseConnection);
$recipes = $recipeObject->getByUser($_SESSION['user_id']);

$pageTitle = 'Dashboard';
include __DIR__ . '/../includes/header.php';
?>

<h2>Dashboard</h2>
<p>Halo, <?= htmlspecialchars($_SESSION['username']) ?></p>

<a href="<?= APP_URL ?>/user/new-recipe.php">Tulis Resep Baru</a>`)
  },
  {
    title: "user/my-recipes.php",
    html: code("php", `<table>
    <tr>
        <th>Judul</th>
        <th>Kategori</th>
        <th>Status</th>
    </tr>
    <?php foreach ($recipes as $recipe): ?>
        <tr>
            <td><?= htmlspecialchars($recipe['title']) ?></td>
            <td><?= htmlspecialchars($recipe['category_name']) ?></td>
            <td><?= htmlspecialchars($recipe['status']) ?></td>
        </tr>
    <?php endforeach; ?>
</table>`)
  },
  {
    title: "Form New Recipe",
    html: `${tags(["title", "category", "description", "ingredients", "cooking_type", "difficulty", "cooking_time_minutes", "image optional"])}${callout("Setelah submit, status resep adalah <code>pending</code>. Resep belum tampil sebelum admin approve.")}`
  },
  {
    title: "user/new-recipe.php: Proses POST",
    html: code("php", `<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireLogin();

$categoryObject = new Category($databaseConnection);
$recipeObject = new Recipe($databaseConnection);
$categories = $categoryObject->getAll();
$errors = [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = trim($_POST['title'] ?? '');

    if (!Validator::required($title)) {
        $errors[] = 'Judul wajib diisi.';
    }

    if (!$errors) {
        $recipeObject->create([
            'user_id' => $_SESSION['user_id'],
            'category_id' => (int) $_POST['category_id'],
            'title' => $title,
            'slug' => strtolower(str_replace(' ', '-', $title)) . '-' . time(),
            'description' => trim($_POST['description'] ?? ''),
            'ingredients' => trim($_POST['ingredients'] ?? ''),
            'cooking_type' => trim($_POST['cooking_type'] ?? ''),
            'difficulty' => $_POST['difficulty'] ?? 'easy',
            'cooking_time_minutes' => (int) $_POST['cooking_time_minutes']
        ]);
    }
}`)
  },
  {
    title: "user/new-recipe.php: Form",
    html: code("php", `<form method="post">
    <input type="text" name="title" placeholder="Judul resep">
    <select name="category_id">
        <?php foreach ($categories as $category): ?>
            <option value="<?= $category['id'] ?>">
                <?= htmlspecialchars($category['name']) ?>
            </option>
        <?php endforeach; ?>
    </select>
    <textarea name="description" placeholder="Deskripsi"></textarea>
    <textarea name="ingredients" placeholder="Bahan"></textarea>
    <input type="text" name="cooking_type" placeholder="Jenis masakan">
    <select name="difficulty">
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
    </select>
    <input type="number" name="cooking_time_minutes" placeholder="Menit">
    <button type="submit">Submit Resep</button>
</form>`)
  },
  {
    title: "user/profile.php",
    html: `${code("php", `<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireLogin();

$pageTitle = 'Profil';
include __DIR__ . '/../includes/header.php';`)}${code("php", `<h2>Profil</h2>
<p>Username: <?= htmlspecialchars($_SESSION['username']) ?></p>
<p>Role: <?= htmlspecialchars($_SESSION['role']) ?></p>`)}`
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
    title: "admin/index.php",
    html: code("php", `<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireAdmin();

$pageTitle = 'Admin Dashboard';
include __DIR__ . '/../includes/header.php';
?>

<h2>Admin Dashboard</h2>
<nav class="admin-nav">
    <a href="<?= APP_URL ?>/admin/users.php">Users</a>
    <a href="<?= APP_URL ?>/admin/categories.php">Categories</a>
    <a href="<?= APP_URL ?>/admin/recipes.php">Recipes</a>
    <a href="<?= APP_URL ?>/admin/comments.php">Comments</a>
</nav>`)
  },
  {
    title: "admin/users.php: POST Action",
    html: code("php", `<?php
require_once __DIR__ . '/../includes/bootstrap.php';

$auth = new Auth($databaseConnection);
$auth->requireAdmin();

$userObject = new User($databaseConnection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = (int) $_POST['id'];
    $userAction = $_POST['action'];

    if ($userAction === 'approve') $userObject->updateStatus($userId, 'approved');
    if ($userAction === 'reject') $userObject->updateStatus($userId, 'rejected');
    if ($userAction === 'make_admin') $userObject->updateRole($userId, 'admin');
    if ($userAction === 'delete') $userObject->delete($userId);

    header('Location: ' . APP_URL . '/admin/users.php');
    exit;
}

$users = $userObject->getAll();`)
  },
  {
    title: "admin/users.php: Table",
    html: code("php", `<table>
<?php foreach ($users as $user): ?>
    <tr>
        <td><?= htmlspecialchars($user['username']) ?></td>
        <td><?= htmlspecialchars($user['role']) ?></td>
        <td><?= htmlspecialchars($user['status']) ?></td>
        <td>
            <form method="post">
                <input type="hidden" name="id" value="<?= $user['id'] ?>">
                <button name="action" value="approve">Approve</button>
                <button name="action" value="reject">Reject</button>
                <button name="action" value="make_admin">Make Admin</button>
                <button name="action" value="delete">Delete</button>
            </form>
        </td>
    </tr>
<?php endforeach; ?>
</table>`)
  },
  {
    title: "admin/categories.php",
    html: code("php", `$categoryObject = new Category($databaseConnection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $categoryAction = $_POST['action'];
    $categoryId = (int) ($_POST['id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    $slug = strtolower(str_replace(' ', '-', $name));

    if ($categoryAction === 'create') $categoryObject->create($name, $slug);
    if ($categoryAction === 'update') $categoryObject->update($categoryId, $name, $slug);
    if ($categoryAction === 'delete') $categoryObject->delete($categoryId);

    header('Location: ' . APP_URL . '/admin/categories.php');
    exit;
}

$categories = $categoryObject->getAll();`)
  },
  {
    title: "admin/categories.php: Form",
    html: code("php", `<form method="post">
    <input type="text" name="name" placeholder="Nama kategori">
    <button name="action" value="create">Tambah</button>
</form>

<?php foreach ($categories as $category): ?>
    <form method="post">
        <input type="hidden" name="id" value="<?= $category['id'] ?>">
        <input type="text" name="name" value="<?= htmlspecialchars($category['name']) ?>">
        <button name="action" value="update">Update</button>
        <button name="action" value="delete">Delete</button>
    </form>
<?php endforeach; ?>`)
  },
  {
    title: "admin/recipes.php",
    html: code("php", `$recipeObject = new Recipe($databaseConnection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recipeId = (int) $_POST['id'];
    $recipeAction = $_POST['action'];

    if ($recipeAction === 'approve') $recipeObject->updateStatus($recipeId, 'approved');
    if ($recipeAction === 'reject') $recipeObject->updateStatus($recipeId, 'rejected');
    if ($recipeAction === 'delete') $recipeObject->delete($recipeId);

    header('Location: ' . APP_URL . '/admin/recipes.php');
    exit;
}

$recipes = $recipeObject->getAllForAdmin();`)
  },
  {
    title: "admin/comments.php",
    html: code("php", `$commentObject = new Comment($databaseConnection);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $commentId = (int) $_POST['id'];
    $commentAction = $_POST['action'];

    if ($commentAction === 'approve') $commentObject->updateStatus($commentId, 'approved');
    if ($commentAction === 'reject') $commentObject->updateStatus($commentId, 'rejected');
    if ($commentAction === 'delete') $commentObject->delete($commentId);

    header('Location: ' . APP_URL . '/admin/comments.php');
    exit;
}

$comments = $commentObject->getAll();`)
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
    title: "Test End-to-End Working Site",
    html: `${ordered([
      "Buka homepage dan pastikan header/footer tampil.",
      "Login sebagai <code>admin</code> dari seed admin.",
      "Approve user baru dari <code>/admin/users.php</code>.",
      "Login sebagai user approved.",
      "Submit resep dari <code>/user/new-recipe.php</code>.",
      "Approve resep dari <code>/admin/recipes.php</code>.",
      "Pastikan resep tampil di homepage dan <code>recipe.php</code>.",
      "Submit komentar, approve komentar, lalu pastikan komentar tampil."
    ])}${callout("Kalau semua langkah ini berhasil, aplikasi sudah bukan hanya layout: sudah menjadi website PHP/MySQL yang bekerja.")}
    `
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
    html: `${code("php", `$unsafeLoginQuery = "SELECT * FROM users WHERE username = '$username'";`)}${code("text", "' OR '1'='1")}${callout("User jahat bisa menyisipkan SQL ke dalam input.")}`
  },
  {
    title: "Mencegah SQL Injection",
    html: `${code("php", `$userLookupStatement = $databaseConnection->prepare("SELECT * FROM users WHERE username = ?");
$userLookupStatement->execute([$username]);`)}${callout("Prepared statement memisahkan perintah SQL dari input user.")}`
  },
  {
    title: "Password Security di Login",
    html: `${code("php", `$passwordHash = password_hash($password, PASSWORD_DEFAULT);

if (password_verify($password, $user['password_hash'])) {
    $_SESSION['user_id'] = $user['id'];
}`)}${callout("Kita tidak pernah menyimpan password asli. Yang disimpan adalah hash, lalu login memakai <code>password_verify()</code>.")}
    `
  },
  {
    title: "Redirect Harus Diikuti exit",
    html: `${code("php", `header('Location: ' . APP_URL . '/login.php');
exit;`)}${callout("Setelah mengirim redirect, gunakan <code>exit</code> supaya kode di bawahnya tidak lanjut berjalan.")}
    `
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
|   +-- config.php
|   +-- bootstrap.php
|   +-- header.php
|   +-- footer.php
+-- classes/
|   +-- Database.php
|   +-- Validator.php
|   +-- User.php
|   +-- Auth.php
|   +-- Category.php
|   +-- Recipe.php
|   +-- Comment.php
+-- assets/
|   +-- css/
|   |   +-- style.css
|   +-- js/
|       +-- app.js
+-- uploads/
+-- security-lab/`)
  },
  {
    className: "chapter",
    html: `<p class="kicker">Level 2 Bonus</p><h2>Styling Website</h2><p>Setelah aplikasi bekerja, kita naik level: membuat tampilannya lebih rapi, nyaman dibaca, dan terasa seperti website resep sungguhan.</p>${tags(["CSS variables", "layout", "cards", "forms", "admin table", "responsive"])}`
  },
  {
    title: "Sebelum Styling",
    html: `${list([
      "fitur sudah jalan",
      "database sudah terhubung",
      "register, login, submit resep, dan admin approval sudah bisa dites",
      "tapi tampilan masih terasa polos"
    ])}${callout("Styling adalah second pass. Jangan membuat tampilan cantik sebelum alur utama bisa bekerja.")}`
  },
  {
    title: "Arah Visual: Clean Recipe App",
    html: `${table(["Bagian", "Keputusan"], [
      ["Warna", "Hangat, bersih, tidak terlalu ramai."],
      ["Layout", "Lebar konten nyaman dibaca, card rapi, jarak konsisten."],
      ["Admin", "Lebih utilitarian: table jelas, tombol aksi mudah dibedakan."],
      ["Mobile", "Grid turun menjadi satu kolom, form tetap mudah disentuh."]
    ])}${callout("Kita tidak mengubah logic PHP. Kita hanya memperbaiki <code>assets/css/style.css</code>.")}`
  },
  {
    title: "CSS Variables",
    html: code("css", `:root {
    --color-bg: #fffaf3;
    --color-surface: #ffffff;
    --color-text: #2f2924;
    --color-muted: #7a6f66;
    --color-primary: #9b3f2f;
    --color-primary-dark: #742f24;
    --color-border: #eadfd3;
    --color-success: #2f7d4f;
    --color-warning: #b7791f;
    --color-danger: #b42318;
    --shadow-soft: 0 12px 30px rgba(47, 41, 36, 0.08);
    --radius: 8px;
    --container: 1100px;
}`) 
  },
  {
    title: "Base Layout",
    html: code("css", `* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: Arial, sans-serif;
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
}

.container {
    width: min(92%, var(--container));
    margin: 0 auto;
}

a {
    color: var(--color-primary);
    text-decoration: none;
}

a:hover {
    color: var(--color-primary-dark);
}`) 
  },
  {
    title: "Header dan Navigation",
    html: code("css", `.site-header {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    position: sticky;
    top: 0;
    z-index: 10;
}

.site-header .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 18px 0;
}

.logo a {
    color: var(--color-text);
    font-weight: 700;
}

.top-nav {
    display: flex;
    gap: 16px;
}`) 
  },
  {
    title: "Recipe Grid dan Cards",
    html: code("css", `.recipe-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    margin: 28px 0;
}

.recipe-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    box-shadow: var(--shadow-soft);
    padding: 20px;
}

.recipe-card h3 {
    margin: 0 0 8px;
}

.recipe-card p {
    color: var(--color-muted);
}`) 
  },
  {
    title: "Forms dan Buttons",
    html: code("css", `.form-group {
    margin-bottom: 16px;
}

label {
    display: block;
    margin-bottom: 6px;
    font-weight: 700;
}

input,
select,
textarea {
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 10px 12px;
    font: inherit;
}

.button,
button {
    border: 0;
    border-radius: var(--radius);
    padding: 10px 14px;
    cursor: pointer;
}`) 
  },
  {
    title: "Button Variants dan Alerts",
    html: code("css", `.button-primary,
button[type="submit"] {
    background: var(--color-primary);
    color: white;
}

.button-danger {
    background: var(--color-danger);
    color: white;
}

.button-neutral {
    background: #f3ece4;
    color: var(--color-text);
}

.alert {
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: #fff4df;
    padding: 12px 14px;
    margin-bottom: 16px;
}`) 
  },
  {
    title: "Admin Table dan Status Badge",
    html: code("css", `.admin-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
}

.admin-table th,
.admin-table td {
    padding: 12px;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
}

.status-pending {
    color: var(--color-warning);
    font-weight: 700;
}

.status-approved {
    color: var(--color-success);
    font-weight: 700;
}

.status-rejected {
    color: var(--color-danger);
    font-weight: 700;
}`) 
  },
  {
    title: "Detail Resep dan Komentar",
    html: code("css", `.recipe-detail {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 28px;
    box-shadow: var(--shadow-soft);
}

.recipe-detail h2 {
    margin-top: 0;
}

.comment {
    background: var(--color-surface);
    border-left: 4px solid var(--color-primary);
    border-radius: var(--radius);
    padding: 14px 16px;
    margin-bottom: 12px;
}`) 
  },
  {
    title: "Responsive CSS",
    html: code("css", `@media (max-width: 760px) {
    .site-header .container {
        align-items: flex-start;
        flex-direction: column;
    }

    .top-nav {
        flex-wrap: wrap;
    }

    .recipe-grid {
        grid-template-columns: 1fr;
    }

    .admin-table {
        display: block;
        overflow-x: auto;
    }
}`) 
  },
  {
    title: "Sesudah Styling",
    html: `${list([
      "homepage punya card resep yang mudah dibaca",
      "form register, login, dan submit resep terasa lebih rapi",
      "admin table lebih jelas untuk approval dan CRUD",
      "status pending, approved, rejected mudah dibedakan",
      "mobile tidak memaksa tiga kolom"
    ])}${callout("Logic PHP tetap sama. Yang berubah hanya cara browser menampilkan HTML melalui CSS.")}`
  },
  {
    title: "Checklist Styling",
    html: `${ordered([
      "Buka homepage di desktop dan mobile.",
      "Pastikan card resep tidak terlalu sempit.",
      "Coba register/login: form mudah discan.",
      "Buka admin table: kolom dan tombol tidak bertabrakan.",
      "Pastikan status badge mudah dibedakan.",
      "Pastikan tombol primary, danger, dan neutral punya rasa visual berbeda."
    ])}${callout("Kalau styling membuat halaman sulit dipakai, berarti styling perlu disederhanakan.")}`
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
      "Dasar mencegah XSS dan SQL Injection",
      "Bonus styling agar aplikasi lebih rapi dan responsive"
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
  "Sebelum mengetik banyak file, kita lihat dulu rumah akhirnya. Dengan peta ini, murid tahu kenapa folder admin, user, includes, dan classes muncul.",
  "Saat browser membuka index, sebenarnya ada rangkaian kecil di belakang layar: bootstrap menyiapkan aplikasi, header membuka tampilan, lalu isi halaman dan footer tampil.",
  "Pola halaman ini akan berulang terus. Kalau murid hafal pola ini, file baru tidak terasa asing lagi.",
  "Kita pisahkan tanggung jawab. Header bukan tempat menyalakan database; halaman memanggil bootstrap dulu, baru memanggil header untuk tampilan.",
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
  "Seed categories memberi data awal supaya form resep nanti langsung punya pilihan.",
  "Table recipes adalah tempat kartu resep utama disimpan.",
  "Table comments menyimpan percakapan di bawah resep.",
  "Setelah table dibuat, kita cek di phpMyAdmin. Jangan lanjut kalau pondasi database belum benar.",
  "Admin pertama kita buat lewat file lokal sementara. Ini jalan masuk awal supaya fitur approval bisa dicoba.",
  "Setelah admin berhasil dibuat, file seed harus dihapus. Ini kebiasaan aman sejak awal.",
  "",
  "Sebelum menulis class besar, kita kenali dulu bentuk dasarnya. Class di PHP adalah cetakan yang ditulis dengan kata class.",
  "Property adalah data di dalam class. Seperti cetakan kue punya bahan dan bentuk, class punya property untuk menyimpan ciri.",
  "Constructor seperti momen saat cetakan dipilih dan disiapkan. Ia otomatis berjalan ketika object baru dibuat.",
  "Method adalah aksi di dalam class. Setelah object dibuat, kita bisa memanggil aksinya dengan tanda panah.",
  "Folder classes seperti kotak alat khusus. Setiap class memegang satu pekerjaan.",
  "Database class menjadi petugas pembuka pintu ke MySQL.",
  "Nama seperti DB_HOST datang dari config. Kita sengaja menaruh alamat penting di satu tempat supaya class tidak penuh angka dan string yang tersebar.",
  "Kita bisa saja require config langsung di class, tapi untuk latihan ini bootstrap menjadi pintu masuk utama. Ia menyiapkan lingkungan aplikasi, lalu class tinggal bekerja sesuai tugasnya.",
  "Di constructor, koneksi disiapkan saat object dibuat. DSN adalah alamat lengkapnya, lalu PDO membuka jalur ke MySQL.",
  "PDO adalah alat standar PHP untuk berbicara dengan database. Setelah object PDO jadi, query SQL nanti lewat jalur ini.",
  "Error mode exception membuat masalah database muncul jelas. Kalau ada query rusak, kita ingin tahu segera, bukan gagal diam-diam.",
  "Fetch mode associative membuat hasil query enak dibaca: kita mengambil data dengan nama column, seperti title dan description.",
  "getConnection mengembalikan koneksi yang sudah dibuat, supaya class lain bisa memakai database tanpa membuat koneksi baru sendiri.",
  "Bootstrap sekarang lebih rapi karena meminta koneksi lewat class Database.",
  "Versi akhir bootstrap juga mengenalkan semua class utama. Dengan begitu halaman tidak perlu require class satu per satu terlalu sering.",
  "Constructor injection berarti class menerima koneksi dari luar. Satu PDO dari bootstrap dipakai bersama.",
  "Validator seperti penjaga pintu form. Ia mengecek apakah data masuk akal sebelum diterima.",
  "User class memegang urusan data user: mencari username dan membuat akun baru.",
  "Admin juga butuh mengubah status, role, dan menghapus user. Itu tetap kita taruh di User class.",
  "Category class mengurus rak kategori resep.",
  "Karena admin mengelola kategori, class Category perlu method create, update, dan delete.",
  "Recipe class mengurus kartu resep: mengambil, membuat, menyetujui, atau menolak.",
  "Statement adalah object query yang sudah disiapkan. Nama stmt hanya singkatan; untuk belajar, statement lebih mudah dibaca.",
  "Prepared statement punya urutan: prepare, bind value bila perlu, execute, lalu fetch hasilnya.",
  "Halaman detail dan kategori butuh cara mengambil resep yang sudah approved.",
  "Submit resep masuk sebagai pending. Method create menyimpan data, method updateStatus dipakai admin.",
  "Dashboard user perlu melihat resep miliknya sendiri, jadi Recipe punya method getByUser.",
  "Admin membutuhkan daftar semua resep, termasuk pending dan rejected. Query itu tetap kita bungkus di Recipe class.",
  "Comment class mengambil komentar approved untuk halaman detail resep.",
  "Komentar baru juga pending. Admin nanti memutuskan komentar mana yang tampil.",
  "Homepage dinamis artinya kartu resep tidak ditulis manual lagi, tetapi diambil dari database.",
  "Halaman detail mengambil id dari URL, lalu mencari resep approved yang sesuai.",
  "Setelah resep ditemukan, kita tampilkan isi dengan escape output supaya aman.",
  "Form komentar memakai login protection. User harus login sebelum komentarnya disimpan.",
  "Halaman kategori memakai category_id dari URL untuk memfilter resep.",
  "Register adalah proses membuat kartu anggota baru.",
  "Saat register, password tidak disimpan apa adanya. Kita ubah menjadi bentuk hash yang aman.",
  "File register memvalidasi input dulu. Kalau aman, baru panggil User::register.",
  "Form register sederhana saja: username, email, password, dan daftar error bila ada.",
  "Login adalah mencocokkan kartu anggota dan password, lalu memastikan statusnya sudah approved.",
  "Auth class adalah petugas keamanan pintu masuk.",
  "Auth juga menyediakan requireLogin dan requireAdmin supaya halaman terlindungi dengan satu baris jelas.",
  "Login page menerima POST, memanggil Auth::login, lalu redirect jika berhasil.",
  "Form login tidak rumit. Yang penting username dan password dikirim lewat POST.",
  "Logout menghancurkan session, lalu mengirim user kembali ke homepage.",
  "Melindungi halaman seperti memasang tanda: hanya user login atau admin yang boleh masuk.",
  "Dashboard adalah meja kerja user setelah berhasil masuk.",
  "Dashboard memanggil requireLogin, lalu mengambil resep milik user dari session user_id.",
  "My recipes menampilkan status resep supaya user tahu apakah resepnya masih pending atau sudah approved.",
  "Form resep adalah kartu kosong yang diisi user sebelum dikirim ke admin.",
  "Saat form resep dikirim, kita validasi judul, siapkan slug sederhana, lalu simpan sebagai pending.",
  "Form resep mengambil kategori dari database, bukan menulis option manual.",
  "Profile sederhana dulu: tampilkan username dan role dari session.",
  "Admin panel adalah meja pemeriksaan konten.",
  "Admin dashboard menjadi pintu ke halaman users, categories, recipes, dan comments.",
  "Halaman users membaca action dari tombol POST: approve, reject, make admin, atau delete.",
  "Table users menaruh beberapa tombol dalam satu form kecil per baris.",
  "Halaman categories memakai pola CRUD sederhana: create, update, delete dalam satu file.",
  "Form kategori dibuat langsung di halaman yang sama supaya alurnya mudah diikuti.",
  "Halaman recipes menjadi meja approval resep: approve, reject, atau delete.",
  "Halaman comments memakai pola yang sama untuk komentar.",
  "Status pending, approved, dan rejected membantu semua orang tahu posisi data.",
  "Komentar juga bagian dari galeri. Karena ditulis user, komentar perlu dijaga.",
  "Tes end-to-end membuktikan semua bagian terhubung: register, approve user, submit resep, approve resep, komentar, approve komentar.",
  "Security dimulai dari kebiasaan sederhana: jangan percaya input mentah.",
  "Validasi mengecek apakah data masuk akal sebelum masuk ke database.",
  "Escape output membuat tulisan user aman saat tampil di browser.",
  "XSS seperti menyelipkan kertas berisi perintah aneh ke papan komentar. Browser bisa tertipu kalau kita tidak hati-hati.",
  "SQL Injection seperti user mencoba bicara langsung ke lemari database dengan kalimat berbahaya.",
  "Prepared statement membuat input user tetap menjadi data, bukan berubah menjadi perintah SQL.",
  "Password security punya dua sisi: hash saat register, verify saat login.",
  "Setelah redirect, hentikan script dengan exit supaya tidak ada kode lanjutan yang ikut berjalan.",
  "Slug adalah nama jalan yang rapi untuk sebuah resep.",
  "Security lab adalah tempat latihan aman. Kita melihat contoh buruk hanya di lokal supaya tahu cara memperbaikinya.",
  "Di akhir, bentuk project sudah seperti rumah lengkap: ruang publik, ruang user, ruang admin, classes, uploads, dan security lab.",
  "Level dua dimulai setelah aplikasi bekerja. Sekarang kita tidak mengejar fitur baru, tetapi membuat pengalaman memakai aplikasi terasa lebih rapi.",
  "Sebelum styling, aplikasi boleh saja terlihat polos. Yang penting fondasinya sudah benar dulu.",
  "Arah visual membantu kita memilih warna, jarak, dan bentuk komponen tanpa asal menebak.",
  "CSS variables seperti catatan bahan desain. Kalau warna utama berubah, kita ubah di satu tempat.",
  "Base layout adalah fondasi tampilan: font, background, container, link, dan line-height.",
  "Header dan navigation membantu user tahu sedang berada di aplikasi apa dan bisa pindah halaman dengan nyaman.",
  "Recipe card adalah wajah utama aplikasi resep. Card harus mudah discan, tidak terlalu ramai, dan punya jarak yang cukup.",
  "Form yang rapi membuat user lebih percaya diri mengisi data.",
  "Button variants dan alert membantu user membedakan aksi biasa, aksi utama, dan aksi berbahaya.",
  "Admin table harus praktis. Admin butuh membaca status dan menekan tombol aksi tanpa bingung.",
  "Halaman detail resep dan komentar perlu ruang baca yang nyaman karena isinya lebih panjang.",
  "Responsive CSS memastikan tampilan tetap bisa dipakai di layar kecil.",
  "Sesudah styling, logic PHP tetap sama. Kita hanya membuat HTML yang sama tampil lebih profesional.",
  "Checklist styling mengingatkan kita bahwa desain bagus harus tetap mudah dipakai.",
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

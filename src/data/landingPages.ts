export interface LandingPageData {
	slug: string;
	navLabel: string; // short keyword-rich label for footer/nav links
	meta: { title: string; description: string };
	hero: { eyebrow: string; title: string; subtitle: string; waMessage: string };
	intro: { heading: string; paragraphs: string[] };
	highlights: string[];
	faq: Array<{ q: string; a: string }>;
	schema: { name: string };
}

const PAGES: LandingPageData[] = [
	{
		slug: "jasa-pindah-rumah-semarang",
		navLabel: "Jasa Pindah Rumah",
		meta: {
			title: "Jasa Pindah Rumah Semarang Terpercaya, Harga Terjangkau | Indo Mover 2026",
			description:
				"Jasa pindah rumah Semarang profesional — Indo Mover melayani packing, angkut, & bongkar muat. Tim terlatih, armada terawat, harga transparan. Survey gratis ke seluruh wilayah Semarang.",
		},
		hero: {
			eyebrow: "Spesialis Pindah Rumah di Semarang",
			title: "Jasa Pindah Rumah Semarang yang Aman & Terpercaya",
			subtitle:
				"Indo Mover mengurus seluruh proses pindah rumah Anda—dari survey gratis, packing profesional, pengangkutan, hingga penataan di lokasi baru. Armada Pick-Up hingga Fuso, tim terlatih, harga transparan.",
			waMessage:
				"Halo Indo Mover, saya butuh jasa pindah rumah di Semarang. Bisa bantu jadwalkan survey gratis?",
		},
		intro: {
			heading: "Solusi Pindah Rumah Terpercaya di Semarang",
			paragraphs: [
				"Pindah rumah adalah momen besar yang membutuhkan perencanaan matang dan mitra yang tepat. Indo Mover hadir sebagai penyedia jasa pindah rumah di Semarang yang mengutamakan keamanan barang dan kepuasan pelanggan. Setiap proses pindahan kami tangani dengan standar operasional yang ketat—mulai dari survey gratis, estimasi biaya transparan, packing profesional, hingga penataan ulang di lokasi tujuan.",
				"Tim Indo Mover terdiri dari tenaga terlatih yang berpengalaman menangani berbagai jenis barang rumah tangga: furnitur berukuran besar, elektronik sensitif, koleksi berharga, hingga peralatan dapur. Kami menggunakan material packing berkualitas tinggi—bubble wrap double layer, karton double wall, pelindung sudut kayu—agar semua barang Anda tiba dalam kondisi sempurna.",
				"Kami melayani jasa pindah rumah di seluruh 16 kecamatan Kota Semarang, dari Tembalang, Banyumanik, Pedurungan, Ngaliyan, hingga Semarang Barat dan Semarang Utara. Pilihan armada kami yang beragam—Pick-Up, CDE, CDD, hingga Fuso—memastikan Anda hanya membayar kapasitas yang benar-benar dibutuhkan.",
			],
		},
		highlights: [
			"Survey gratis tanpa kewajiban di lokasi Anda",
			"Packing profesional dengan material berkualitas tinggi",
			"Armada terawat dari Pick-Up hingga Fuso",
			"Tim terlatih, berseragam rapi, dan komunikatif",
			"Bongkar-pasang furnitur sudah termasuk dalam layanan",
			"Melayani seluruh 16 kecamatan Kota Semarang",
		],
		faq: [
			{
				q: "Berapa biaya jasa pindah rumah di Semarang?",
				a: "Biaya jasa pindah rumah di Semarang bervariasi mulai dari Rp 700.000 untuk pindahan 1–2 kamar dengan Pick-Up, hingga Rp 3.500.000–5.000.000 untuk rumah besar yang membutuhkan truk Fuso. Biaya final ditentukan berdasarkan volume barang, jarak tempuh, dan layanan tambahan seperti packing atau bongkar-muat. Kami menyediakan survey gratis untuk memberikan estimasi akurat tanpa kewajiban.",
			},
			{
				q: "Apakah biaya jasa pindah sudah termasuk packing?",
				a: "Layanan packing bisa disertakan atau dipisahkan sesuai kebutuhan Anda. Paket lengkap (packing, loading, transport, unloading) tersedia dengan harga terpadu. Jika Anda ingin mengemas sendiri, kami bisa menyediakan jasa transport saja. Detail bisa dikonsultasikan saat survey.",
			},
			{
				q: "Berapa lama waktu yang dibutuhkan untuk pindah rumah di Semarang?",
				a: "Rata-rata pindahan rumah dalam kota Semarang membutuhkan waktu 4–8 jam, tergantung volume barang, jumlah lantai, dan kemudahan akses. Rumah besar dengan banyak furnitur bisa memakan waktu hingga 10–12 jam. Kami akan estimasikan durasi saat survey gratis.",
			},
			{
				q: "Apakah Indo Mover bisa pindah di akhir pekan atau malam hari?",
				a: "Ya, kami melayani jasa pindah rumah 7 hari seminggu termasuk akhir pekan dan hari libur. Untuk permintaan di luar jam kerja atau malam hari, harap konfirmasi saat pemesanan agar kami bisa menyiapkan tim.",
			},
			{
				q: "Bagaimana penanganan barang pecah belah atau elektronik?",
				a: "Kami memiliki protokol penanganan khusus untuk barang sensitif—TV, kulkas, mesin cuci, lemari kaca, dan koleksi berharga. Material packing khusus (foam, bubble wrap tebal) tersedia untuk perlindungan maksimal. Sampaikan kondisi barang khusus saat survey agar kami siapkan material yang tepat.",
			},
			{
				q: "Apakah ada asuransi untuk barang selama pindahan?",
				a: "Asuransi tersedia sebagai layanan opsional untuk barang bernilai tinggi. Premi dan cakupan akan dijelaskan secara transparan sebelum pindahan dimulai. Hubungi kami untuk informasi lebih lanjut.",
			},
			{
				q: "Bagaimana cara memesan jasa pindah rumah Indo Mover?",
				a: "Hubungi kami via WhatsApp kapan saja. Tim kami akan merespons cepat, menjadwalkan survey gratis di lokasi Anda, dan memberikan penawaran harga yang terperinci. Tidak ada biaya apapun untuk survey dan konsultasi awal.",
			},
		],
		schema: { name: "Jasa Pindah Rumah Semarang" },
	},

	{
		slug: "jasa-pindah-kantor-semarang",
		navLabel: "Jasa Pindah Kantor",
		meta: {
			title: "Jasa Pindah Kantor Semarang Profesional, Minim Downtime | Indo Mover 2026",
			description:
				"Jasa pindah kantor Semarang oleh Indo Mover — penanganan peralatan IT, arsip, dan furnitur kantor. Jadwal fleksibel di luar jam operasional. Survey gratis, harga transparan.",
		},
		hero: {
			eyebrow: "Spesialis Relokasi Kantor & Bisnis",
			title: "Jasa Pindah Kantor Semarang Profesional & Minim Downtime",
			subtitle:
				"Relokasi kantor, toko, atau gudang Anda ke lokasi baru tanpa gangguan operasional. Indo Mover menyediakan tim koordinator khusus, jadwal fleksibel di luar jam kerja, dan penanganan aman untuk peralatan IT dan arsip.",
			waMessage:
				"Halo Indo Mover, saya perlu bantuan pindah kantor di Semarang. Bisa jadwalkan survey?",
		},
		intro: {
			heading: "Relokasi Kantor yang Terencana, Minim Gangguan Bisnis",
			paragraphs: [
				"Pindah kantor bukan sekadar memindahkan meja dan kursi. Di balik proses relokasi terdapat peralatan IT bernilai tinggi, arsip penting, furnitur custom, dan tekanan waktu yang ketat agar operasional bisnis tidak terganggu. Indo Mover memahami kompleksitas ini dan menawarkan solusi jasa pindah kantor di Semarang yang terencana dan profesional.",
				"Kami menyediakan tim koordinator on-site yang bertugas mengatur alur kerja, memastikan setiap item diinventaris, dan berkomunikasi langsung dengan manajer fasilitas Anda. Proses packing arsip dan peralatan IT dilakukan dengan standar khusus—termasuk anti-static wrap untuk komponen elektronik dan labeling sistem untuk mempermudah unpacking di lokasi baru.",
				"Fleksibilitas jadwal adalah keunggulan kami untuk relokasi kantor: kami bisa bekerja di akhir pekan, malam hari, atau dini hari agar aktivitas kantor tidak terganggu sama sekali. Survey dan perencanaan dilakukan jauh sebelum hari H sehingga pada hari pindahan semua berjalan mulus dan efisien.",
			],
		},
		highlights: [
			"Tim koordinator on-site khusus relokasi kantor",
			"Survey dan jadwal di luar jam operasional bisnis",
			"Packing arsip & peralatan IT dengan standar khusus",
			"Inventaris dan checklist serah-terima lengkap",
			"Armada CDD hingga Fuso untuk volume kantor besar",
			"Melayani relokasi kantor, toko, gudang, dan showroom",
		],
		faq: [
			{
				q: "Berapa biaya jasa pindah kantor di Semarang?",
				a: "Biaya jasa pindah kantor bergantung pada volume peralatan dan furnitur, jumlah lantai, jarak, dan waktu (jam kerja vs. luar jam kerja). Kami menyarankan survey gratis sebelum memberikan penawaran agar estimasi akurat. Untuk kantor kecil (10–20 workstation), biaya umumnya mulai dari Rp 2.000.000.",
			},
			{
				q: "Apakah Indo Mover bisa pindahan kantor di luar jam kerja?",
				a: "Ya. Kami menyediakan jadwal pindahan malam hari, akhir pekan, dan hari libur untuk meminimalkan gangguan terhadap operasional bisnis Anda. Harap diskusikan preferensi jadwal saat survey.",
			},
			{
				q: "Bagaimana penanganan peralatan IT dan server?",
				a: "Kami menangani monitor, CPU, laptop, printer, UPS, dan peralatan jaringan dengan protokol khusus: anti-static wrap, padding tambahan, dan kotak terpisah per perangkat. Untuk server atau peralatan sangat sensitif, kami rekomendasikan Anda mengemas sendiri dengan bantuan tim IT, dan kami membantu pengangkutan ke lokasi baru.",
			},
			{
				q: "Apakah disediakan checklist inventaris?",
				a: "Ya. Tim kami menyiapkan checklist inventaris sebelum pindahan dimulai. Setiap item diberi label dan dicatat sehingga Anda bisa memverifikasi bahwa semua barang tiba di lokasi baru. Dokumen serah-terima diberikan setelah pindahan selesai.",
			},
			{
				q: "Berapa lama waktu yang dibutuhkan untuk relokasi kantor?",
				a: "Sangat tergantung pada skala kantor. Kantor kecil (5–10 workstation) bisa selesai dalam 1 hari kerja. Kantor besar atau multi-lantai mungkin membutuhkan 2–3 hari dengan tim terpisah. Kami akan menyusun jadwal detail saat survey.",
			},
			{
				q: "Apakah Indo Mover bisa membantu pindah gudang atau pabrik?",
				a: "Ya, kami melayani relokasi gudang, pabrik kecil, dan fasilitas komersial lainnya. Kami menyediakan armada besar (Fuso/Wingbox) dan tim yang terbiasa menangani barang berat dalam jumlah besar.",
			},
		],
		schema: { name: "Jasa Pindah Kantor Semarang" },
	},

	{
		slug: "jasa-pindah-kost-semarang",
		navLabel: "Jasa Pindah Kost",
		meta: {
			title: "Jasa Pindah Kost Semarang Murah & Cepat | Indo Mover 2026",
			description:
				"Jasa pindah kost Semarang cepat & terjangkau — Indo Mover melayani pindahan kamar kost, kontrakan, dan studio apartemen. Pick-Up & Blind Van tersedia. Survey gratis via WhatsApp.",
		},
		hero: {
			eyebrow: "Pindah Kost & Kontrakan di Semarang",
			title: "Jasa Pindah Kost Semarang Murah, Cepat & Terpercaya",
			subtitle:
				"Pindah kamar kost atau kontrakan di Semarang jadi mudah dan terjangkau bersama Indo Mover. Layanan Pick-Up dan Blind Van tersedia untuk pindahan skala kecil—cepat selesai, harga bersahabat.",
			waMessage:
				"Halo Indo Mover, saya mau pindah kost di Semarang. Bisa bantu info harga dan jadwal?",
		},
		intro: {
			heading: "Pindah Kost di Semarang? Cepat, Mudah, Hemat",
			paragraphs: [
				"Pindah kamar kost atau kontrakan tidak harus ribet dan mahal. Indo Mover menyediakan jasa pindah kost di Semarang yang dirancang khusus untuk pindahan skala kecil: kamar kost, kontrakan, studio, hingga apartemen 1 kamar. Dengan armada Pick-Up dan Blind Van yang lincah, kami bisa menjangkau gang sempit, lokasi tanpa lift, dan area terbatas sekalipun.",
				"Banyak mahasiswa dan karyawan muda di Semarang—terutama di sekitar Tembalang (Undip), Banyumanik, dan Ngaliyan—menggunakan jasa kami karena prosesnya simpel: hubungi via WhatsApp, tentukan jadwal, dan tim kami datang tepat waktu. Tidak perlu sewa truk sendiri atau merepotkan teman.",
				"Harga pindahan kost kami transparan dan terjangkau. Kami menghitung biaya berdasarkan volume barang dan jarak tempuh—sehingga pindahan 1 kamar kost tidak dikenakan biaya yang sama dengan pindahan rumah 3 kamar. Anda hanya membayar yang benar-benar Anda butuhkan.",
			],
		},
		highlights: [
			"Pick-Up & Blind Van tersedia untuk pindahan kecil",
			"Harga terjangkau, transparan, tanpa biaya tersembunyi",
			"Cepat selesai — rata-rata 2–4 jam untuk 1 kamar",
			"Melayani area kos mahasiswa (Tembalang, Banyumanik, Ngaliyan)",
			"Bisa bantu bongkar-pasang rak dan furnitur kecil",
			"Jadwal fleksibel, bisa mendadak sesuai ketersediaan tim",
		],
		faq: [
			{
				q: "Berapa biaya jasa pindah kost di Semarang?",
				a: "Jasa pindah kost di Semarang umumnya mulai dari Rp 300.000–700.000 untuk pindahan 1 kamar dalam kota menggunakan Pick-Up. Biaya final tergantung volume barang dan jarak. Hubungi kami via WhatsApp untuk estimasi cepat—tidak perlu survey, cukup ceritakan isi kamar dan rute pindahan Anda.",
			},
			{
				q: "Berapa lama waktu yang dibutuhkan untuk pindah kost?",
				a: "Rata-rata 2–4 jam untuk pindahan 1 kamar kost dalam kota Semarang. Ini sudah termasuk loading di lokasi asal, perjalanan, dan unloading di lokasi tujuan. Kami prioritaskan efisiensi agar Anda bisa segera menetap di kost baru.",
			},
			{
				q: "Apakah bisa pindah kost tanpa survey?",
				a: "Ya, untuk pindahan kost skala kecil kami bisa memberikan estimasi via WhatsApp atau telepon tanpa perlu survey fisik. Cukup ceritakan jumlah dan ukuran barang, asal-tujuan, dan kami akan berikan penawaran cepat.",
			},
			{
				q: "Apakah Indo Mover bisa menjangkau gang sempit atau lokasi tanpa lift?",
				a: "Ya. Armada Pick-Up dan Blind Van kami berukuran kecil dan lincah, cocok untuk gang sempit dan area parkir terbatas. Untuk kost di lantai atas tanpa lift, tim kami siap angkat barang menggunakan tangga.",
			},
			{
				q: "Apakah bisa pindah kost di hari yang sama setelah menghubungi?",
				a: "Kami berusaha mengakomodasi permintaan mendadak sesuai ketersediaan tim. Untuk pindahan hari H, hubungi kami via WhatsApp sepagi mungkin. Kami akan konfirmasi ketersediaan dan menjadwalkan yang terbaik untuk Anda.",
			},
		],
		schema: { name: "Jasa Pindah Kost Semarang" },
	},

	{
		slug: "jasa-pindah-murah-semarang",
		navLabel: "Jasa Pindah Murah",
		meta: {
			title: "Jasa Pindah Murah Semarang, Terpercaya & Profesional | Indo Mover 2026",
			description:
				"Cari jasa pindah murah di Semarang? Indo Mover menawarkan harga terjangkau dengan kualitas profesional. Armada sesuai kebutuhan, harga transparan, survey gratis. Hubungi via WhatsApp.",
		},
		hero: {
			eyebrow: "Pindahan Hemat di Semarang",
			title: "Jasa Pindah Murah Semarang, Terpercaya & Tanpa Biaya Tersembunyi",
			subtitle:
				"Pindahan terjangkau bukan berarti kualitas rendah. Indo Mover menyediakan jasa pindah murah di Semarang dengan armada yang tepat untuk volume Anda—sehingga Anda hanya membayar yang benar-benar dibutuhkan, bukan flat rate mahal.",
			waMessage:
				"Halo Indo Mover, saya cari jasa pindah murah di Semarang. Bisa info harga dan armada yang tersedia?",
		},
		intro: {
			heading: "Harga Murah, Kualitas Tidak Berkompromi",
			paragraphs: [
				"Banyak orang berpikir jasa pindah profesional pasti mahal. Indo Mover hadir membuktikan bahwa pindahan murah dan berkualitas bisa berjalan beriringan. Kunci efisiensi biaya kami adalah pencocokan armada: kami merekomendasikan kendaraan dengan kapasitas yang tepat-pas untuk volume barang Anda—tidak ada kapasitas terbuang yang membebani tagihan.",
				"Transparansi harga adalah komitmen kami. Sebelum pindahan dimulai, Anda menerima penawaran tertulis yang merinci biaya armada, jumlah tenaga, estimasi durasi, dan apakah packing termasuk atau tidak. Tidak ada biaya kejutan di akhir. Apa yang disepakati adalah apa yang Anda bayar.",
				"Kami juga menyediakan paket layanan yang fleksibel. Jika Anda ingin menekan biaya, Anda bisa memilih paket transport-only (kami hanya angkut, Anda sudah kemas sendiri), atau paket bongkar-muat saja tanpa packing. Konsultasikan kebutuhan Anda dan kami bantu temukan solusi paling hemat.",
			],
		},
		highlights: [
			"Armada disesuaikan dengan volume—tidak ada kapasitas terbuang",
			"Harga transparan & tertulis sebelum pindahan dimulai",
			"Paket fleksibel: transport saja, atau layanan penuh",
			"Survey gratis untuk estimasi biaya yang akurat",
			"Tidak ada biaya kejutan atau tambahan tak terduga",
			"Kompetitif untuk pindahan kost, rumah, hingga kantor kecil",
		],
		faq: [
			{
				q: "Berapa range harga jasa pindah di Semarang?",
				a: "Harga jasa pindah di Semarang berkisar dari Rp 300.000 (kost/1 kamar, Pick-Up, dalam kota) hingga Rp 5.000.000+ (rumah besar/kantor dengan Fuso). Variabel utama: jenis & kapasitas armada, jarak, jumlah tenaga, dan layanan tambahan. Survey gratis tersedia untuk estimasi akurat.",
			},
			{
				q: "Bagaimana cara Indo Mover menjaga harga tetap terjangkau?",
				a: "Kami merekomendasikan armada yang kapasitasnya sesuai volume barang Anda—tidak lebih, tidak kurang. Ini menghindari biaya berlebih untuk kapasitas yang tidak terpakai. Selain itu, layanan kami modular: Anda bisa pilih hanya transport, atau tambah packing, atau paket lengkap—sesuai anggaran.",
			},
			{
				q: "Apakah ada biaya tersembunyi?",
				a: "Tidak ada. Kami memberikan penawaran tertulis sebelum pindahan yang mencakup semua biaya. Jika ada kondisi tak terduga di lapangan (akses sangat sulit, lantai sangat tinggi tanpa lift), kami komunikasikan terlebih dahulu sebelum menambahkan biaya apa pun.",
			},
			{
				q: "Apa paket layanan paling terjangkau yang tersedia?",
				a: "Paket paling terjangkau adalah transport-only: Anda mengemas barang sendiri, dan kami menyediakan armada beserta tenaga loading-unloading. Ini bisa menekan biaya secara signifikan dibanding paket lengkap yang termasuk packing profesional.",
			},
			{
				q: "Apakah kualitas layanan berbeda antara paket murah dan paket lengkap?",
				a: "Standar keamanan pengangkutan sama di semua paket—armada terawat, pengemudi berpengalaman, dan barang diikat dengan benar. Perbedaannya hanya pada layanan packing: paket murah mengandalkan pengemasan Anda sendiri, paket lengkap ditangani tim packing profesional kami.",
			},
		],
		schema: { name: "Jasa Pindah Murah Semarang" },
	},

	{
		slug: "jasa-pindah-antar-kota",
		navLabel: "Jasa Pindah Antar Kota",
		meta: {
			title: "Jasa Pindah Antar Kota dari Semarang | Indo Mover 2026",
			description:
				"Jasa pindah antar kota dari Semarang — Indo Mover melayani rute ke Jakarta, Surabaya, Yogyakarta, Bandung & seluruh Indonesia. Tim berpengalaman, armada tertutup, harga transparan.",
		},
		hero: {
			eyebrow: "Pindah Antar Kota dari Semarang",
			title: "Jasa Pindah Antar Kota dari Semarang ke Seluruh Indonesia",
			subtitle:
				"Pindah keluar Semarang? Indo Mover melayani jasa pindah antar kota dengan armada tertutup dan terawat. Rute populer: Semarang–Jakarta, Semarang–Surabaya, Semarang–Yogyakarta, dan banyak lagi.",
			waMessage:
				"Halo Indo Mover, saya mau pindah antar kota dari Semarang. Bisa bantu estimasi biaya dan jadwal?",
		},
		intro: {
			heading: "Pindah Keluar Kota? Percayakan pada Ahlinya",
			paragraphs: [
				"Pindah antar kota memerlukan persiapan yang lebih matang dibanding pindahan dalam kota. Barang harus dikemas lebih kuat untuk menahan guncangan selama perjalanan panjang, armada harus tertutup rapat agar barang tidak terkena hujan atau debu, dan jadwal harus terkoordinasi dengan baik di kedua ujung rute.",
				"Indo Mover melayani jasa pindah antar kota dari Semarang ke seluruh Jawa Tengah dan luar provinsi. Rute yang sering kami layani mencakup Semarang–Jakarta, Semarang–Surabaya, Semarang–Yogyakarta, Semarang–Bandung, Semarang–Purwokerto, dan Semarang–Bali. Kami juga melayani rute-rute ke kota yang tidak tercantum—hubungi kami untuk konfirmasi.",
				"Untuk pindahan antar kota, kami menggunakan armada CDD atau Fuso dengan bak tertutup penuh. Material packing diperkuat dengan bubble wrap tebal dan foam pelindung agar barang tidak bergeser selama perjalanan. Koordinasi di kota tujuan—termasuk jadwal unloading dan akses lokasi—kami urus bersama Anda sejak sebelum keberangkatan.",
			],
		},
		highlights: [
			"Armada CDD & Fuso tertutup untuk keamanan perjalanan jauh",
			"Packing diperkuat khusus untuk transportasi antar kota",
			"Rute ke seluruh Jawa & luar Jawa (konfirmasi via WhatsApp)",
			"Koordinasi jadwal kedua ujung rute bersama Anda",
			"Estimasi waktu tiba diberikan sebelum keberangkatan",
			"Asuransi opsional tersedia untuk barang bernilai tinggi",
		],
		faq: [
			{
				q: "Rute antar kota mana saja yang dilayani Indo Mover?",
				a: "Kami melayani pindahan dari Semarang ke seluruh kota di Jawa Tengah, Jawa Barat (Bandung), DKI Jakarta, Jawa Timur (Surabaya), DI Yogyakarta, dan kota-kota lain di Indonesia. Hubungi kami via WhatsApp untuk konfirmasi rute spesifik Anda.",
			},
			{
				q: "Berapa biaya jasa pindah antar kota dari Semarang?",
				a: "Biaya pindahan antar kota bergantung pada jarak, volume barang, dan jenis armada. Sebagai gambaran: Semarang–Yogyakarta mulai dari Rp 1.500.000, Semarang–Jakarta mulai dari Rp 3.500.000, Semarang–Surabaya mulai dari Rp 2.000.000 (armada CDE, satu arah). Penawaran akurat diberikan setelah survey.",
			},
			{
				q: "Berapa lama waktu tempuh pindah antar kota?",
				a: "Waktu tempuh bervariasi: Semarang–Yogyakarta ±3 jam, Semarang–Surabaya ±5–6 jam, Semarang–Jakarta ±8–10 jam. Untuk rute lebih dari 6 jam, kami biasanya berangkat pagi hari agar unloading di kota tujuan bisa dilakukan di siang/sore hari yang sama.",
			},
			{
				q: "Apakah ada risiko kerusakan barang selama perjalanan jauh?",
				a: "Kami memperkuat packing secara khusus untuk pindahan antar kota—termasuk tambahan bubble wrap, pengisian celah dengan foam, dan pengikatan yang lebih rapat. Barang tidak akan bergerak bebas di dalam truk. Asuransi opsional juga tersedia untuk perlindungan tambahan.",
			},
			{
				q: "Apakah saya perlu hadir di lokasi tujuan saat barang diturunkan?",
				a: "Idealnya ada perwakilan di lokasi tujuan untuk menerima dan memverifikasi barang. Jika Anda tidak bisa hadir, kami bisa koordinasikan dengan orang yang Anda percaya di kota tujuan. Hubungi kami untuk mendiskusikan opsi terbaik.",
			},
		],
		schema: { name: "Jasa Pindah Antar Kota Semarang" },
	},

	{
		slug: "jasa-pindah-apartemen-semarang",
		navLabel: "Jasa Pindah Apartemen",
		meta: {
			title: "Jasa Pindah Apartemen Semarang Profesional | Indo Mover 2026",
			description:
				"Jasa pindah apartemen Semarang — Indo Mover berpengalaman menangani tantangan pindahan apartemen: lift, parkir terbatas, aturan gedung. Tim terlatih, armada tepat, survey gratis.",
		},
		hero: {
			eyebrow: "Spesialis Pindah Apartemen di Semarang",
			title: "Jasa Pindah Apartemen Semarang yang Berpengalaman & Rapi",
			subtitle:
				"Pindahan apartemen memiliki tantangan unik—lift sempit, aturan jam loading, parkir terbatas. Indo Mover sudah berpengalaman menangani semua ini di berbagai apartemen di Semarang. Tim terlatih, proses rapi, barang aman.",
			waMessage:
				"Halo Indo Mover, saya mau pindah apartemen di Semarang. Bisa bantu survey dan info aturan gedung?",
		},
		intro: {
			heading: "Pindah Apartemen di Semarang? Kami Sudah Hafal Tantangannya",
			paragraphs: [
				"Pindahan apartemen berbeda dari pindahan rumah biasa. Anda berhadapan dengan jadwal lift yang harus dibooking, aturan jam loading (banyak gedung hanya izinkan pukul 09.00–17.00), area parkir terbatas, dan koridor sempit yang membatasi ukuran furnitur. Indo Mover sudah berpengalaman menangani semua kompleksitas ini di berbagai unit apartemen di Semarang.",
				"Sebelum hari pindahan, tim kami akan membantu Anda mengkonfirmasi aturan manajemen gedung: apakah perlu booking lift, apakah ada ketentuan ukuran barang maksimal, area mana yang bisa dipakai untuk loading, dan jam berapa saja pergerakan barang diizinkan. Persiapan ini memastikan tidak ada kejutan di hari H.",
				"Untuk pindahan apartemen, kami menggunakan armada Pick-Up, Blind Van, atau CDE yang lebih lincah di area parkir basement yang kerap sempit. Furnitur besar yang tidak muat melalui lift kami tangani dengan teknik khusus—termasuk pembongkaran dan perakitan ulang di lokasi tujuan.",
			],
		},
		highlights: [
			"Berpengalaman di berbagai apartemen di Semarang",
			"Koordinasi aturan gedung (booking lift, jam loading) sebelum H",
			"Armada lincah (Pick-Up, Blind Van, CDE) untuk parkir sempit",
			"Bongkar-pasang furnitur besar yang tidak muat di lift",
			"Packing rapi agar furnitur tidak tergores di koridor sempit",
			"Jadwal fleksibel sesuai ketentuan manajemen gedung",
		],
		faq: [
			{
				q: "Apa yang perlu dipersiapkan sebelum pindah apartemen?",
				a: "Sebelum hari pindahan, konfirmasi hal-hal ini dengan manajemen gedung: apakah lift perlu dibooking dan jam berapa, apakah ada biaya administrasi pindahan, area mana yang bisa digunakan untuk parkir truk, dan adakah aturan ukuran barang. Tim Indo Mover bisa membantu Anda mengurus koordinasi ini.",
			},
			{
				q: "Bagaimana menangani furnitur besar yang tidak muat melalui lift?",
				a: "Kami memiliki pengalaman membongkar dan merakit ulang furnitur besar—lemari 4 pintu, ranjang king-size, sofa modular—agar bisa melalui pintu lift dan koridor sempit. Biaya bongkar-pasang sudah termasuk dalam paket standar kami. Informasikan furnitur khusus saat survey agar kami siapkan tim yang tepat.",
			},
			{
				q: "Apakah Indo Mover mengetahui aturan di apartemen-apartemen Semarang?",
				a: "Kami sudah menangani pindahan di banyak apartemen di Semarang dan memahami variasi aturan tiap gedung. Namun aturan bisa berubah, jadi kami selalu konfirmasi ulang dengan manajemen sebelum hari H agar tidak ada kendala.",
			},
			{
				q: "Berapa biaya jasa pindah apartemen di Semarang?",
				a: "Biaya pindah apartemen umumnya serupa dengan pindahan rumah seukurannya: studio mulai dari Rp 500.000, apartemen 1 kamar mulai dari Rp 800.000, apartemen 2–3 kamar mulai dari Rp 1.500.000. Biaya bisa bervariasi tergantung lantai, ketersediaan lift, dan aksesibilitas. Survey gratis untuk estimasi akurat.",
			},
			{
				q: "Apakah bisa pindah apartemen di akhir pekan?",
				a: "Ya, kami melayani pindahan di akhir pekan. Namun perlu diperhatikan bahwa beberapa manajemen apartemen hanya mengizinkan pindahan di hari kerja. Konfirmasi aturan gedung Anda terlebih dahulu, lalu hubungi kami untuk menyesuaikan jadwal.",
			},
		],
		schema: { name: "Jasa Pindah Apartemen Semarang" },
	},
];

export const LANDING_PAGES: Record<string, LandingPageData> = Object.fromEntries(
	PAGES.map((p) => [p.slug, p]),
);

export const LANDING_ROUTES = PAGES.map((p) => `/${p.slug}/`);

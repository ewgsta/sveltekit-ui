<script lang="ts">
	import {
		Accordion,
		Alert,
		Avatar,
		AvatarFallback,
		Badge,
		Button,
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
		Checkbox,
		Dialog,
		Input,
		Label,
		Progress,
		Radio,
		Select,
		Slider,
		Sonner,
		Switch,
		Tabs,
		Textarea,
		Tooltip,
		toast
	} from '$lib/ui';

	let open = $state(false);
	let tab = $state('form');
	let volume = $state(60);
	let progress = $state(55);
	let agree = $state(false);
	let theme = $state('açık');
	let choice = $state('a');

	const tabsArr = [
		{ value: 'form', label: 'Form' },
		{ value: 'ayarlar', label: 'Ayarlar' }
	];
</script>

{#snippet snippetVars()}
	<p>Tüm renk ve ölçü tokenları `globals.css` içinde tanımlıdır.</p>
{/snippet}

{#snippet snippetSetup()}
	<p>Bileşenler `$lib/ui` üzerinden içe aktarılır.</p>
{/snippet}

<div class="page">
	<h1>Geçici Anasayfa</h1>
	<p class="muted">UI kütüphanesi bileşenlerinin deneme sayfası.</p>

	<section>
		<h2>Butonlar</h2>
		<div class="row">
			<Button>Varsayılan</Button>
			<Button variant="secondary">İkincil</Button>
			<Button variant="outline">Anahat</Button>
			<Button variant="ghost">Hayalet</Button>
			<Button variant="destructive">Tehlike</Button>
			<Button variant="link">Bağlantı</Button>
			<Button size="sm">Küçük</Button>
			<Button size="lg">Büyük</Button>
			<Button disabled>Devre dışı</Button>
		</div>
	</section>

	<section>
		<h2>Formlar</h2>
		<div class="grid">
			<label>
				<Label>Başlık</Label>
				<Input placeholder="Anime adı" />
			</label>
			<label>
				<Label>Ses seviyesi</Label>
				<Slider bind:value={volume} min={0} max={100} />
			</label>
			<label>
				<Label>Notlar</Label>
				<Textarea placeholder="İçerik…" />
			</label>
			<label>
				<Label>Seçim</Label>
				<Select
					bind:value={theme}
					placeholder="Seç…"
					items={[
						{ value: 'açık', label: 'Açık' },
						{ value: 'koyu', label: 'Koyu' }
					]}
				/>
			</label>
			<label>
				<Label>Onayla</Label>
				<Checkbox bind:checked={agree} />
			</label>
			<div class="row">
				<Label>Anahtar</Label>
				<Switch bind:checked={agree} />
			</div>
			<div class="row">
				<Label>Seçenek A</Label>
				<Radio name="choice" value="a" checked={choice === 'a'} onchange={() => (choice = 'a')} />
			</div>
			<div class="row">
				<Label>Seçenek B</Label>
				<Radio name="choice" value="b" checked={choice === 'b'} onchange={() => (choice = 'b')} />
			</div>
		</div>
	</section>

	<section>
		<h2>Geri bildirim</h2>
		<div class="grid">
			<Progress value={progress} max={100} />
			<Tooltip text="Bu bir ipucu"><Button>Üzerime gel</Button></Tooltip>
			<Alert title="Dikkat">Bu bir uyarı kutusudur.</Alert>
			<Badge>Etiket</Badge>
			<Badge variant="secondary">İkincil</Badge>
			<Avatar><AvatarFallback>AK</AvatarFallback></Avatar>
			<div class="row">
				<Button onclick={() => toast.default({ title: 'Kaydedildi' })}>Bilgi</Button>
				<Button
					variant="outline"
					onclick={() => toast.success({ title: 'Başarılı', description: 'İşlem tamamlandı.' })}
				>
					Başarı
				</Button>
				<Button
					variant="destructive"
					onclick={() => toast.error({ title: 'Hata', description: 'Bir şeyler ters gitti.' })}
				>
					Hata
				</Button>
			</div>
		</div>
	</section>

	<section>
		<h2>Kart & Sekmeler</h2>
		<Card>
			<CardHeader>
				<CardTitle>Kart Başlığı</CardTitle>
				<CardDescription>Kısa açıklama metni</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs tabs={tabsArr} value={tab} onValueChange={(v) => (tab = v)}>
					<p>{tab === 'form' ? 'Form sekmesi' : 'Ayarlar sekmesi'}</p>
				</Tabs>
			</CardContent>
			<CardFooter>
				<Button onclick={() => (open = true)}>İletişim aç</Button>
			</CardFooter>
		</Card>

		<Accordion
			items={[
				{ title: 'Değişkenler', content: snippetVars },
				{ title: 'Kurulum', content: snippetSetup }
			]}
		/>
	</section>
</div>

<Dialog {open} title="Örnek İletişim" onclose={() => (open = false)}>
	<p>İçerik buraya gelir.</p>
</Dialog>

<Sonner />

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: 24px;
		max-width: 720px;
		margin: 0 auto;
		padding: 24px;
	}

	.page h1 {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.page h2 {
		font-size: 1rem;
		font-weight: 600;
		margin-bottom: 8px;
	}

	.muted {
		color: var(--muted-foreground);
	}

	.row {
		display: flex;
		align-items: center;
		gap: 12px;
		flex-wrap: wrap;
	}

	.grid {
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 12px;
		padding: 16px;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
	}

	:global([data-slot='toggle']) {
		width: fit-content;
	}
</style>

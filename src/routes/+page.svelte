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
		Combobox,
		DatePicker,
		Dialog,
		DropdownMenu,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		Ellipsis,
		Input,
		Kbd,
		Label,
		Popover,
		Progress,
		Radio,
		Select,
		Separator,
		Slider,
		Skeleton,
		Sonner,
		Switch,
		Tabs,
		Textarea,
		ToggleGroup,
		Tooltip,
		toast
	} from '$lib/ui';

	let open = $state(false);
	let dlgText = $state(false);
	let dlgInput = $state(false);
	let dlgButtons = $state(false);
	let tab = $state('form');
	let volume = $state(60);
	let progress = $state(55);
	let agree = $state(false);
	let theme = $state('açık');
	let choice = $state('a');
	let combo = $state('');
	let date = $state<Date | undefined>(undefined);
	let toggled = $state('bir');
	let toggles = $state([]);

	const tabsArr = [
		{ value: 'form', label: 'Form' },
		{ value: 'ayarlar', label: 'Ayarlar' }
	];

	const comboItems = [
		{ value: 'one', label: 'Naruto' },
		{ value: 'two', label: 'One Piece' },
		{ value: 'three', label: 'Bleach' }
	];

	const toggleItems = [
		{ value: 'bir', label: 'Bir' },
		{ value: 'iki', label: 'İki' },
		{ value: 'üç', label: 'Üç' }
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

		<section>
			<h2>Diyaloglar (İletişim)</h2>
			<div class="row">
				<Button variant="outline" onclick={() => (dlgText = true)}>Metin</Button>
				<Button variant="outline" onclick={() => (dlgInput = true)}>Metin kutusu</Button>
				<Button variant="outline" onclick={() => (dlgButtons = true)}>Buton</Button>
			</div>
		</section>

		<Accordion
			items={[
				{ title: 'Değişkenler', content: snippetVars },
				{ title: 'Kurulum', content: snippetSetup }
			]}
		/>
	</section>

	<section>
		<h2>İşlevsel Bileşenler</h2>

		<div class="grid">
			<div class="row">
				<DropdownMenu>
					{#snippet trigger()}
						<Button variant="outline" size="icon-sm">
							<Ellipsis size={16} />
						</Button>
					{/snippet}
					<DropdownMenuLabel>Hesap</DropdownMenuLabel>
					<DropdownMenuItem onSelect={() => toast.default({ title: 'Düzenle seçildi' })}>
						Düzenle
					</DropdownMenuItem>
					<DropdownMenuItem>Paylaş</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem variant="destructive">Sil</DropdownMenuItem>
				</DropdownMenu>

				<Popover side="bottom" align="start">
					{#snippet trigger()}
						<Button variant="outline">Popover</Button>
					{/snippet}
					<p class="popover-note">
						Bu bir popover içeriğidir. Dışarı tıklayınca veya Esc ile kapanır.
					</p>
				</Popover>
			</div>

			<label>
				<Label>Filtre (arama)</Label>
				<Combobox bind:value={combo} items={comboItems} />
			</label>

			<label>
				<Label>Tarih</Label>
				<DatePicker bind:value={date} />
			</label>

			<div class="row">
				<ToggleGroup items={toggleItems} bind:value={toggled} />
			</div>

			<div class="row">
				<ToggleGroup type="multiple" items={toggleItems} bind:values={toggles} />
			</div>
		</div>
	</section>

	<section>
		<h2>Yardımcı Bileşenler</h2>
		<div class="grid">
			<div class="row">
				<Skeleton class="skeleton-lg" />
				<Skeleton class="skeleton-avatar" />
			</div>
			<div class="row">
				<Separator orientation="vertical" class="sep-demo" />
				<span>Ayraçlar</span>
				<Separator orientation="vertical" class="sep-demo" />
			</div>
			<div class="row">
				<Kbd>Ctrl</Kbd>
				<Kbd>K</Kbd>
				<Kbd>⌘</Kbd>
			</div>
		</div>
	</section>
</div>

<Dialog
	{open}
	title="Örnek İletişim"
	description="Form alanı ve buton varyasyonları"
	onclose={() => (open = false)}
>
	<label>
		<Label>Mesaj</Label>
		<Input placeholder="Bir şeyler yaz…" autofocus />
	</label>
	<div class="dialog-actions">
		<Button variant="outline" onclick={() => (open = false)}>Vazgeç</Button>
		<Button onclick={() => (open = false)}>Gönder</Button>
	</div>
</Dialog>

<Dialog open={dlgText} title="Basit İletişim" onclose={() => (dlgText = false)}>
	<p>Normal yazılı içerik buraya gelir.</p>
</Dialog>

<Dialog
	open={dlgInput}
	title="Metin Kutusu"
	description="Tek alanlı varyasyon"
	onclose={() => (dlgInput = false)}
>
	<label>
		<Label>Başlık</Label>
		<Input placeholder="Anime adı" />
	</label>
</Dialog>

<Dialog
	open={dlgButtons}
	title="Onayla"
	description="Butonlu varyasyon"
	onclose={() => (dlgButtons = false)}
>
	<p>Bu işlemi gerçekleştirmek istediğine emin misin?</p>
	<div class="dialog-actions">
		<Button variant="outline" onclick={() => (dlgButtons = false)}>Vazgeç</Button>
		<Button onclick={() => (dlgButtons = false)}>Onayla</Button>
	</div>
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

	.dialog-actions {
		display: flex;
		justify-content: flex-end;
		gap: 8px;
		margin-top: 4px;
	}

	.popover-note {
		max-width: 14rem;
		font-size: 0.813rem;
		color: var(--muted-foreground);
		line-height: 1.5;
	}

	:global(.skeleton-lg) {
		width: 12rem;
		height: 12px;
	}

	:global(.skeleton-avatar) {
		width: 32px;
		height: 32px;
		border-radius: 50%;
	}

	:global(.sep-demo) {
		height: 1.25rem;
	}
</style>

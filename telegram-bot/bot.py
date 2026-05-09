import os
import asyncio
import logging
import threading
from http.server import HTTPServer, BaseHTTPRequestHandler
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

logging.basicConfig(level=logging.INFO)

TOKEN   = os.environ.get("TELEGRAM_BOT_TOKEN", "")
PORT    = int(os.environ.get("PORT", 10000))
APP_URL = "https://cyberlux-station.pages.dev"
LOGO    = "https://raw.githubusercontent.com/00impera/Cyberlux-Multi-Token-Staking/badf086b4eead1f78d113c94f13c76cb2162b403/20.png.png"

KEYBOARD = InlineKeyboardMarkup([
    [InlineKeyboardButton("🚀 Open Cyberlux App", url=APP_URL)],
    [
        InlineKeyboardButton("📊 MonadScan", url="https://monadscan.io/address/0xe96462daa04464036b24f48b2c43d47f9072c34b"),
        InlineKeyboardButton("🌐 SocialScan", url="https://socialscan.io/address/0xe96462daa04464036b24f48b2c43d47f9072c34b"),
    ],
    [
        InlineKeyboardButton("🎨 OpenSea", url="https://opensea.io/SUPERRARECOINS"),
        InlineKeyboardButton("💬 Support", url="https://t.me/MultiTokenStaking_Bot"),
    ],
])

class HealthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"OK")
    def log_message(self, *args):
        pass

def run_health_server():
    HTTPServer(("0.0.0.0", PORT), HealthHandler).serve_forever()

async def start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "Welcome to *CYBERLUX STATION* ⚡\n"
        "Stake • Earn • Unlock • NFT • LED Logic\n\n"
        "Cyberlux este primul sistem Multi‑Token Staking + NFT Hardware Card, complet sincronizat on‑chain.\n\n"
        "🔗 *Open App:* https://cyberlux-station.pages.dev\n"
        "📈 APR Rates → /apr\n"
        "💳 Stake Guide → /stake\n"
        "📜 Contract Info → /contract\n"
        "❓ Help → /help"
    )
    await update.message.reply_photo(photo=LOGO, caption=text, parse_mode="Markdown", reply_markup=KEYBOARD)

async def app_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "⚡ *Cyberlux Staking App* este live.\n\n"
        "👉 https://cyberlux-station.pages.dev\n\n"
        "Aici poți:\n"
        "• Stake & Unstake\n"
        "• Claim Rewards\n"
        "• Vizualiza NFT-ul tău Cyberlux Card\n"
        "• Verifica LED-ul în timp real"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Open App ↗", url=APP_URL)]]))

async def stake(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "💳 *Cum faci STAKE în Cyberlux:*\n\n"
        "1️⃣ Conectezi wallet-ul în aplicație\n"
        "2️⃣ Alegi tokenul (ERC20)\n"
        "3️⃣ Introduci amount\n"
        "4️⃣ Alegi lockDays\n"
        "5️⃣ Confirmi tranzacția\n"
        "6️⃣ Primești automat NFT-ul Cyberlux Card\n"
        "7️⃣ LED-ul NFT-ului se activează în funcție de status\n\n"
        f"🔗 App: {APP_URL}"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Stake Now ↗", url=APP_URL)]]))

async def unstake(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "🔓 *Cum faci UNSTAKE:*\n\n"
        "✅ Dacă perioada de lock a expirat:\n"
        "→ retragi fără penalizare\n"
        "→ LED devine 🟢 UNLOCKED\n\n"
        "⚠️ Dacă retragi înainte de timp:\n"
        "→ se aplică penalty\n"
        "→ LED devine 🟡 EARLY\n\n"
        "Comandă contract:\n"
        "`withdraw(tokenId)`\n"
        "`earlyWithdraw(tokenId, penaltyPercent)`"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Open App ↗", url=APP_URL)]]))

async def apr(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "💰 *Current APR Rates:*\n\n"
        "🟢 Stablecoins: USDC/USDT0 — *12%* | AUSD/USD1/LVUSD — *10%*\n"
        "🟠 Major: WMON — *25%* | WETH/WBTC/cbBTC — *20%*\n"
        "🔵 Liquid: sMON — *30%* | shMON/aprMON/gMON — *28%* | wstETH — *25%*\n"
        "🟣 Degen: CHOG — *40%* | DUST — *35%* | Cake/LVMON — *30%*\n\n"
        "🏆 Max APR: *40%* (CHOG)\n\n"
        "APR-ul este dinamic — pentru valori live:\n"
        f"🔗 {APP_URL}"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Live APR ↗", url=APP_URL)]]))

async def rewards(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "🎁 *Rewards Info:*\n\n"
        "Rewards se calculează automat în funcție de:\n"
        "• APR\n• amount\n• lockDays\n• timpul scurs\n• rewardsClaimed\n\n"
        "Comenzi contract:\n"
        "`pendingRewards(tokenId)`\n"
        "`claimRewards(tokenId)`"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Claim Rewards ↗", url=APP_URL)]]))

async def nft(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "🎴 *Cyberlux NFT Card:*\n\n"
        "NFT-ul tău conține:\n"
        "🔧 Hardware traits (PCB, MCU, LED, NFC, Battery, Casing, Firmware)\n"
        "🔐 Stake data (token, amount, APR, unlockTime)\n"
        "🎨 SVG on-chain animat\n"
        "💡 LED logic în timp real\n\n"
        "LED Colors:\n"
        "🔴 LOCKED | 🔵 READY | 🟢 UNLOCKED | 🟡 EARLY"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("OpenSea ↗", url="https://opensea.io/SUPERRARECOINS")]]))

async def card(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "💳 *Physical Card Info:*\n\n"
        "• Conține NFC cu tokenId\n"
        "• Trimite tokenId → API Gateway\n"
        "• API citește contractul\n"
        "• LED-ul fizic se aprinde în funcție de NFT\n\n"
        "Endpoint API: `/api/card/status`"
    )
    await update.message.reply_text(text, parse_mode="Markdown")

async def status(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "🚦 *Staking Status Colors:*\n\n"
        "🔴 *LOCKED* — Fondurile sunt blocate.\n"
        "🔵 *READY* — Aproape de unlock.\n"
        "🟢 *UNLOCKED* — Poți retrage fără penalizare.\n"
        "🟡 *EARLY* — Retragere înainte de timp → penalizare."
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Check Status ↗", url=APP_URL)]]))

async def contract(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "📋 *Cyberlux Contract Info:*\n\n"
        "`0xE96462daA04464036b24f48B2c43d47f9072c34B`\n\n"
        "🔗 Chain: Monad Mainnet (ID: 143)\n"
        "✅ Verified on MonadScan\n"
        "🔓 Open Source on GitHub"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([
            [InlineKeyboardButton("MonadScan ↗", url="https://monadscan.io/address/0xe96462daa04464036b24f48b2c43d47f9072c34b")],
            [InlineKeyboardButton("MonadVision ↗", url="https://monadvision.com/address/0xe96462daa04464036b24f48b2c43d47f9072c34b"),
             InlineKeyboardButton("SocialScan ↗", url="https://socialscan.io/address/0xe96462daa04464036b24f48b2c43d47f9072c34b")],
            [InlineKeyboardButton("GitHub ↗", url="https://github.com/00impera/Cyberlux-Multi-Token-Staking")],
        ]))

async def oracle(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "🔮 *Oracle Integration:*\n\n"
        "Cyberlux poate folosi oracole:\n"
        "• Pyth (pull)\n"
        "• Chainlink (push + streams)\n"
        "• Stork (pull)\n"
        "• Redstone (push + pull)\n"
        "• Supra (VRF + feeds)\n\n"
        "APR poate fi actualizat automat în funcție de preț."
    )
    await update.message.reply_text(text, parse_mode="Markdown")

async def api_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "🔌 *API Gateway:*\n\n"
        "API-ul Cyberlux rulează pe Cloudflare Workers.\n\n"
        "Endpoints:\n"
        "`POST /api/card/status` → LED logic\n"
        "`GET /api/oracle/apr` → APR dinamic\n"
        "`GET /api/nft/metadata/:id` → metadata NFT"
    )
    await update.message.reply_text(text, parse_mode="Markdown")

async def dev(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "👨‍💻 *Developer Documentation:*\n\n"
        "GitHub: https://github.com/00impera/Cyberlux-Multi-Token-Staking\n\n"
        "Include:\n"
        "• Contract & ABI\n"
        "• API Gateway\n"
        "• Frontend\n"
        "• NFT SVG\n"
        "• Cloudflare config"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("GitHub ↗", url="https://github.com/00impera/Cyberlux-Multi-Token-Staking")]]))

async def telegram_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("💬 *Cyberlux Telegram Bot:*\nt.me/MultiTokenStaking_Bot", parse_mode="Markdown")

async def opensea(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text("🎨 *OpenSea Collection:*\nhttps://opensea.io/SUPERRARECOINS", parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("OpenSea ↗", url="https://opensea.io/SUPERRARECOINS")]]))

async def donate(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "❤️ *Support the Project:*\n\n"
        "Dacă vrei să susții proiectul, donează MON la:\n"
        "`0xE96462daA04464036b24f48B2c43d47f9072c34B`\n\n"
        "Mulțumim! ⚡"
    )
    await update.message.reply_text(text, parse_mode="Markdown")

async def help_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "🤖 *Cyberlux Bot Commands:*\n\n"
        "/start — Welcome & app link\n"
        "/app — Open staking app\n"
        "/stake — How to stake guide\n"
        "/unstake — How to unstake\n"
        "/apr — Current APR rates\n"
        "/rewards — Rewards info\n"
        "/nft — NFT info & LED logic\n"
        "/card — Physical card info\n"
        "/status — Staking status colors\n"
        "/contract — Contract address & info\n"
        "/oracle — Oracle integration\n"
        "/api — API gateway info\n"
        "/dev — Developer documentation\n"
        "/telegram — Telegram link\n"
        "/opensea — OpenSea collection\n"
        "/donate — Support the project\n"
        "/help — This menu"
    )
    await update.message.reply_text(text, parse_mode="Markdown")

async def main():
    threading.Thread(target=run_health_server, daemon=True).start()
    bot = Application.builder().token(TOKEN).build()
    bot.add_handler(CommandHandler("start",    start))
    bot.add_handler(CommandHandler("app",      app_cmd))
    bot.add_handler(CommandHandler("stake",    stake))
    bot.add_handler(CommandHandler("unstake",  unstake))
    bot.add_handler(CommandHandler("apr",      apr))
    bot.add_handler(CommandHandler("rewards",  rewards))
    bot.add_handler(CommandHandler("nft",      nft))
    bot.add_handler(CommandHandler("card",     card))
    bot.add_handler(CommandHandler("status",   status))
    bot.add_handler(CommandHandler("contract", contract))
    bot.add_handler(CommandHandler("oracle",   oracle))
    bot.add_handler(CommandHandler("api",      api_cmd))
    bot.add_handler(CommandHandler("dev",      dev))
    bot.add_handler(CommandHandler("telegram", telegram_cmd))
    bot.add_handler(CommandHandler("opensea",  opensea))
    bot.add_handler(CommandHandler("donate",   donate))
    bot.add_handler(CommandHandler("help",     help_cmd))
    await bot.initialize()
    await bot.updater.start_polling()
    await bot.start()
    await asyncio.Event().wait()

if __name__ == "__main__":
    asyncio.run(main())

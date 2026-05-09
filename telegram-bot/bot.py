import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import Application, CommandHandler, ContextTypes

logging.basicConfig(level=logging.INFO)

TOKEN   = os.environ.get("TELEGRAM_BOT_TOKEN", "")
APP_URL = "https://cyberlux-station.pages.dev"
LOGO    = "https://raw.githubusercontent.com/00impera/Cyberlux-Multi-Token-Staking/badf086b4eead1f78d113c94f13c76cb2162b403/20.png.png"

WELCOME = (
    "⚡ *CYBERLUX MULTI TOKEN STAKING*\n\n"
    "Stake your tokens on *Monad Mainnet* and earn rewards — minted as NFT cards.\n\n"
    "🪙 *Supported Tokens:* USDC, WMON, WETH, WBTC, sMON, CHOG, DUST & more\n"
    "📈 *APR:* up to 40%\n"
    "🎴 *NFT Cards:* every stake mints a unique physical-style card\n"
    "🔗 *Chain:* Monad Mainnet (Chain ID 143)\n\n"
    "👇 Open the app and start staking:"
)

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

async def start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_photo(
        photo=LOGO,
        caption=WELCOME,
        parse_mode="Markdown",
        reply_markup=KEYBOARD,
    )

async def app(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        f"🚀 Open Cyberlux Staking App:\n{APP_URL}",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Open App ↗", url=APP_URL)]]),
    )

async def stake(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "📈 *How to Stake on Cyberlux:*\n\n"
        "1️⃣ Connect your wallet (MetaMask/WalletConnect)\n"
        "2️⃣ Select a token (USDC, WMON, WETH...)\n"
        "3️⃣ Enter amount & lock period (7–365 days)\n"
        "4️⃣ Click *Approve Token First*\n"
        "5️⃣ Click *Stake & Mint NFT* ✅\n\n"
        f"👉 {APP_URL}"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Stake Now ↗", url=APP_URL)]]))

async def apr(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "💰 *Current APR Rates:*\n\n"
        "🟢 Stablecoins: USDC/USDT0 — *12%* | AUSD/USD1/LVUSD — *10%*\n"
        "🟠 Major: WMON — *25%* | WETH/WBTC/cbBTC — *20%*\n"
        "🔵 Liquid: sMON — *30%* | shMON/aprMON/gMON — *28%* | wstETH — *25%*\n"
        "🟣 Degen: CHOG — *40%* | DUST — *35%* | Cake/LVMON — *30%*\n\n"
        "🏆 Max APR: *40%* (CHOG)"
    )
    await update.message.reply_text(text, parse_mode="Markdown",
        reply_markup=InlineKeyboardMarkup([[InlineKeyboardButton("Stake Now ↗", url=APP_URL)]]))

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
            [InlineKeyboardButton("GitHub ↗", url="https://github.com/00impera/Cyberlux-Multi-Token-Staking")],
        ]))

async def help_cmd(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    text = (
        "🤖 *Cyberlux Bot Commands:*\n\n"
        "/start — Welcome & app link\n"
        "/app — Open staking app\n"
        "/stake — How to stake guide\n"
        "/apr — Current APR rates\n"
        "/contract — Contract address & info\n"
        "/help — This menu"
    )
    await update.message.reply_text(text, parse_mode="Markdown")

def main():
    app_bot = Application.builder().token(TOKEN).build()
    app_bot.add_handler(CommandHandler("start",    start))
    app_bot.add_handler(CommandHandler("app",      app))
    app_bot.add_handler(CommandHandler("stake",    stake))
    app_bot.add_handler(CommandHandler("apr",      apr))
    app_bot.add_handler(CommandHandler("contract", contract))
    app_bot.add_handler(CommandHandler("help",     help_cmd))
    app_bot.run_polling()

if __name__ == "__main__":
    main()

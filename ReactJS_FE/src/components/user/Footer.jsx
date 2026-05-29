import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full mt-20 border-t border-white/10 bg-[linear-gradient(180deg,rgba(16,16,20,0.1),rgba(8,8,10,1))] text-[var(--theme-text)]">
            <div className="max-w-7xl mx-auto px-6 py-16 space-y-10">
                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] items-stretch">
                    <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.03)] p-8 overflow-hidden relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,122,26,0.18),transparent_35%)]" />
                        <div className="relative max-w-xl">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/45 mb-3">Build the board</p>
                            <h3 className="text-3xl md:text-4xl font-black leading-tight mb-4" style={{ fontFamily: 'Anton, sans-serif', letterSpacing: '0.03em' }}>
                                Nắm trọn những drop keycap mới nhất.
                            </h3>
                            <p className="text-sm text-white/60 max-w-lg">
                                Nhận cập nhật về artisan, group-buy, pre-order và các bộ sưu tập keycap giới hạn theo phong cách industrial của shop.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[28px] border border-white/10 bg-[rgba(255,255,255,0.04)] p-8 flex flex-col justify-between gap-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.32em] text-white/45 mb-3">Newsletter</p>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input type="email" placeholder="Email của bạn" className="flex-1 px-4 py-3 rounded-xl bg-black/30 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[var(--theme-accent)]" />
                                <button className="px-6 py-3 rounded-xl bg-[var(--theme-accent)] text-black font-black uppercase tracking-[0.2em] hover:brightness-110 transition whitespace-nowrap">Subscribe</button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs text-white/60">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Keycap selection</div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Fast dispatch</div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Batch updates</div>
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Community builds</div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/35 mb-3">About</p>
                        <p className="text-sm text-white/65 leading-6">
                            Keycap Forge tập trung vào những bộ keycap có cá tính mạnh, phối màu ấn tượng và cảm hứng từ custom keyboard culture.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/35 mb-3">Support</p>
                        <ul className="space-y-2 text-sm text-white/65">
                            <li>Order tracking</li>
                            <li>Shipping policy</li>
                            <li>Help center</li>
                            <li>Community Discord</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/35 mb-3">Collections</p>
                        <ul className="space-y-2 text-sm text-white/65">
                            <li>SA profile</li>
                            <li>Cherry profile</li>
                            <li>Artisan caps</li>
                            <li>Limited group buy</li>
                        </ul>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/35 mb-3">Stay connected</p>
                        <p className="text-sm text-white/65 leading-6">
                            Theo dõi chúng tôi để không bỏ lỡ những set keycap và collab mới nhất.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

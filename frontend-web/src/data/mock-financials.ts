// Single source of truth for financial data
// Used by TreasuryPage and InvestorDashboard

export const FINANCIAL_METRICS = {
    // Balance Sheet
    totalLiquidity: 84250.00, // Cash on Hand
    monthlyBurn: 3200.00,
    pendingRoyalties: 12400.00,

    // Portfolio
    totalInvestment: 120000.00, // Total invested capital
    portfolioLegitimization: 4500000.00, // Implied Valuation (Mock)

    // Growth Stats
    revenueGrowthMoM: 12.5, // %
    activeArtists: 14,
}

export const REVENUE_HISTORY = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 58000 },
    { month: 'Jun', revenue: 84250 }, // Current
]

export const RECENT_TRANSACTIONS = [
    { id: 'tx_1', date: '2026-01-24', desc: 'Spotify Royalties (Dec)', type: 'credit', amount: 1240.50, status: 'Completed' },
    { id: 'tx_2', date: '2026-01-22', desc: 'Marketing Ad Spend (Meta)', type: 'debit', amount: 500.00, status: 'Completed' },
    { id: 'tx_3', date: '2026-01-20', desc: 'Advance Payment (Luna)', type: 'debit', amount: 2000.00, status: 'Pending' },
    { id: 'tx_4', date: '2026-01-15', desc: 'Investor Deposit (Series A)', type: 'credit', amount: 10000.00, status: 'Completed' },
]

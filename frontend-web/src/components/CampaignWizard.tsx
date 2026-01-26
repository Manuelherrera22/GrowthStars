import { useState } from 'react'
import { Users, MessageCircle, Mail, DollarSign, ArrowRight, CheckCircle, Zap, Video } from 'lucide-react'
import { Button } from './ui/Button'

export default function CampaignWizard({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState(1)
    const [segment, setSegment] = useState('')
    const [channel, setChannel] = useState('')

    const handleLaunch = () => {
        setStep(4) // Success state
        setTimeout(onClose, 2000)
    }

    return (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center">
                            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                            Launch Campaign
                        </h2>
                        <p className="text-sm text-slate-400">Target specific fan segments and drive revenue.</p>
                    </div>
                    <div className="text-xs font-mono text-slate-500">Step {step} of 3</div>
                </div>

                <div className="p-8 min-h-[400px]">

                    {/* STEP 1: SEGMENT */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
                            <h3 className="text-lg font-medium text-white">Who are we targeting?</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <OptionCard
                                    icon={Users}
                                    title="Super Fans (Global)"
                                    desc="540 Users • High Intent"
                                    selected={segment === 'super'}
                                    onClick={() => setSegment('super')}
                                />
                                <OptionCard
                                    icon={Users}
                                    title="Visionaries (Bogota)"
                                    desc="120 Users • Local Event"
                                    selected={segment === 'local'}
                                    onClick={() => setSegment('local')}
                                />
                                <OptionCard
                                    icon={Users}
                                    title="Churn Risk"
                                    desc="850 Users • Engagement Rescue"
                                    selected={segment === 'churn'}
                                    onClick={() => setSegment('churn')}
                                />
                            </div>
                        </div>
                    )}

                    {/* STEP 2: CHANNEL */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
                            <h3 className="text-lg font-medium text-white">Select Delivery Channel</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <OptionCard
                                    icon={MessageCircle}
                                    title="WhatsApp VIP"
                                    desc="98% Open Rate • $0.05/msg"
                                    selected={channel === 'whatsapp'}
                                    onClick={() => setChannel('whatsapp')}
                                />
                                <OptionCard
                                    icon={Mail}
                                    title="Email Blast"
                                    desc="20% Open Rate • Free"
                                    selected={channel === 'email'}
                                    onClick={() => setChannel('email')}
                                />
                                <OptionCard
                                    icon={Video}
                                    title="Artist Request"
                                    desc="Organic Content • Free"
                                    selected={channel === 'artist'}
                                    onClick={() => setChannel('artist')}
                                />
                            </div>

                            {channel && channel !== 'artist' && (
                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-center justify-between mt-8">
                                    <div>
                                        <div className="text-sm text-slate-400">Projected Revenue</div>
                                        <div className="text-2xl font-bold text-emerald-400">$2,450.00</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-slate-400">Est. Conversions</div>
                                        <div className="text-xl font-bold text-white">142 Orders</div>
                                    </div>
                                </div>
                            )}

                            {channel === 'artist' && (
                                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mt-8">
                                    <div className="text-sm text-indigo-300 mb-2 font-medium flex items-center">
                                        <Video className="w-4 h-4 mr-2" />
                                        Artist Instruction Preview
                                    </div>
                                    <div className="bg-slate-950 p-4 rounded-lg font-mono text-xs text-slate-300 border border-indigo-500/30">
                                        "Hey Luna! 🌙 We have 850 fans at risk of churning. Please record a 15s video saying 'Miss you guys!' and post it to Stories. Click here to view segment."
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 3: REVIEW */}
                    {step === 3 && (
                        <div className="space-y-6 animate-in slide-in-from-right-8 fade-in">
                            <h3 className="text-lg font-medium text-white">Ready to Launch?</h3>

                            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 space-y-4">
                                <div className="flex justify-between border-b border-slate-800 pb-4">
                                    <span className="text-slate-400">Target Segment</span>
                                    <span className="text-white font-bold">Visionaries (Bogota)</span>
                                </div>
                                <div className="flex justify-between border-b border-slate-800 pb-4">
                                    <span className="text-slate-400">Channel</span>
                                    <span className="text-white font-bold flex items-center">
                                        {channel === 'artist' ? (
                                            <><Video className="w-4 h-4 mr-2 text-indigo-400" /> WhatsApp (Artist)</>
                                        ) : (
                                            <><MessageCircle className="w-4 h-4 mr-2 text-green-500" /> WhatsApp (Fans)</>
                                        )}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-400">Message Template</span>
                                    <span className="text-white font-bold">"Early Bird Offer (Spanish)"</span>
                                </div>
                            </div>

                            {channel !== 'artist' ? (
                                <div className="flex items-center text-sm text-yellow-400 bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    This campaign will cost $12.50 to execute.
                                </div>
                            ) : (
                                <div className="flex items-center text-sm text-indigo-400 bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    No cost. Message will be sent to Luna Eclipse (via WhatsApp).
                                </div>
                            )}
                        </div>
                    )}

                    {/* STEP 4: SUCCESS */}
                    {step === 4 && (
                        <div className="flex flex-col items-center justify-center h-full animate-in zoom-in fade-in space-y-4 text-center">
                            <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white">
                                {channel === 'artist' ? 'Instructions Sent!' : 'Campaign Launched!'}
                            </h3>
                            <p className="text-slate-400">
                                {channel === 'artist'
                                    ? 'Luna has received the request on WhatsApp.'
                                    : 'Messages are being queued. ROI tracking is active.'}
                            </p>
                        </div>
                    )}

                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end space-x-3">
                    {step < 4 && (
                        <>
                            <Button variant="outline" onClick={onClose}>Cancel</Button>
                            <Button
                                disabled={!segment && step === 1 || !channel && step === 2}
                                onClick={() => step < 3 ? setStep(step + 1) : handleLaunch()}
                            >
                                {step === 3 ? 'Confirm & Launch' : 'Next Step'}
                                {step < 3 && <ArrowRight className="w-4 h-4 ml-2" />}
                            </Button>
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}

function OptionCard({ icon: Icon, title, desc, selected, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-xl border cursor-pointer transition-all ${selected
                ? 'bg-indigo-600/20 border-indigo-500 ring-1 ring-indigo-500'
                : 'bg-slate-800/40 border-slate-700 hover:bg-slate-800'
                }`}
        >
            <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${selected ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <div className={`font-semibold ${selected ? 'text-white' : 'text-slate-200'}`}>{title}</div>
                    <div className="text-xs text-slate-500 mt-1">{desc}</div>
                </div>
            </div>
        </div>
    )
}

"use client"

import { motion } from "framer-motion"
import { Store } from "lucide-react"
import { AUTHORIZED_DISTRIBUTORS } from "@/lib/distributors"
import { DistributorCard } from "@/components/distributor-card"

export function ActivationsSection() {
  return (
    <section id="distributors" className="relative py-16 bg-white overflow-hidden scroll-mt-28">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-center mb-10"
        >
          <motion.span
            className="font-mono text-[#121212]/60 text-xs tracking-widest inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            AUTHORIZED RETAIL NETWORK
          </motion.span>
          <h2 className="text-3xl md:text-5xl font-black text-[#10163A] tracking-tighter mt-2 overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.2 }}
            >
              AUTHORIZED{" "}
            </motion.span>
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 inline-block"
              initial={{ y: 100 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1], delay: 0.3 }}
            >
              DISTRIBUTORS
            </motion.span>
          </h2>
          <motion.p
            className="text-sm text-[#10163A]/70 font-mono mt-2 max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Purchase 100% genuine Alpha Tech Nutrition supplements locally from our certified regional retail partner stores.
          </motion.p>
        </motion.div>

        {/* Featured Authorized Store / Distributor Card: Bhiwandi */}
        <div>
          <div className="flex items-center gap-2 mb-3 text-xs font-mono font-bold uppercase tracking-wider text-[#10163A]">
            <Store className="w-4 h-4 text-blue-600" />
            <span>Official Regional Retailer Bhiwandi</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {AUTHORIZED_DISTRIBUTORS.map((distributor) => (
              <DistributorCard key={distributor.id} distributor={distributor} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

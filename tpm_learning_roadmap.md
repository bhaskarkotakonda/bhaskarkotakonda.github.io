# 🚀 TPM Transition Roadmap: Storage to AI GPU Networking

This defines your 8-week curriculum to rewire your mental models from storage (IOPS, NAND, PCIe) to synchronous AI fabrics (Throughput, P99 Jitter, RDMA).

## Month 1: The 'Data in Flight' Pivot & Hard Infrastructure

*Goal: Stop thinking about localized capacity and start thinking about synchronous cluster latency.*

### Week 1: Rewiring to Lossless Fabrics
*Traditional networking (TCP) fails at AI scale due to packet retransmissions. You must understand how Ethernet becomes "lossless."*

*   **📺 Watch (YouTube):** "RDMA over Converged Ethernet (RoCE) Explained" (Mellanox/NVIDIA Seminars).
    *   *Focus:* How RDMA bypasses the CPU kernel and maps InfiniBand transport over standard UDP/IP.
*   **📺 Watch (YouTube):** "Priority Flow Control (PFC) and Explicit Congestion Notification (ECN) in Data Centers".
    *   *Focus:* Understand pause frames (PFC) preventing switch buffer overflows and end-to-end congestion signals (ECN).
*   **📖 Read:** Meta's SIGCOMM Paper: *"RDMA over Ethernet for Deep Learning"*.
    *   *Focus:* The definitive guide on why hyperscalers use standard Ethernet (RoCEv2) over InfiniBand, detailing routing complexities for AI.

### Week 2: Inside the Box (The Node Topology)
*Understand the proprietary domain bridging GPUs within a single node.*

*   **📺 Watch (YouTube):** "Meta Grand Teton Platform Overview" (OCP Global Summit).
    *   *Focus:* Deep hardware teardown. Compare this to your existing compute nodes. Observe the PCIe Gen5/Gen6 switch topologies and the critical 1:1 ratio between GPUs and NICs.
*   **Deep Dive Concept:** NVLink and NVSwitch (Intra-node communication). Why does NVIDIA dominate this space?

### Week 3: Outside the Box (The Scale-Out Network)
*This is the CSP battlefield: connecting thousands of nodes.*

*   **📺 Watch (YouTube):** "Introducing the Ultra Ethernet Consortium (UEC)" (OCP Keynotes).
    *   *Focus:* Why are Broadcom, Meta, and Microsoft trying to kill InfiniBand? Look for core arguments: multi-path packet spraying, flexible packet ordering, and link-level retry.
*   **📖 Read:** The Next Platform articles on "The Battle Between InfiniBand and Ethernet for AI."
    *   *Focus:* InfiniBand's head start (credit-based flow control) vs. Ethernet's scale (800G optics, Broadcom Tomahawk 5).

### Week 4: The COGS & Economics Synthesis
*Translate technical differences into financial realities.*

*   **Action Item:** Build a mental "Scale-Out COGS Teardown."
    *   Compare the Capex delta of an InfiniBand network (turnkey, vendor lock-in, high margin) vs. a UEC Ethernet fabric (diverse NICs, standard silicon) over a 3-4 year lifecycle.

---

## Month 2: Software Middleware & Performance Strategy

*Goal: Connect the physical infrastructure to the software (PyTorch) running the LLM, and learn how to justify Capex through Job Completion Time (JCT).*

### Week 5: Unpacking the Middleware (NCCL)
*If you only understand switches but not what an `AllReduce` operation is, you cannot optimize the cluster.*

*   **📺 Watch (YouTube):** "Understanding NCCL: NVIDIA Collective Communications Library".
    *   *Focus:* Learn the primitives: *All-Gather*, *Reduce-Scatter*, and *All-Reduce*. How does NCCL create logical rings and trees across 10,000 GPUs?
*   **📺 Watch (YouTube):** NVIDIA GTC Sessions on "Optimizing Distributed Training with NCCL".
    *   *Focus:* GPUDirect RDMA. How NCCL handles intra-node (NVLink) vs. inter-node (InfiniBand/Ethernet) memory transfers.

### Week 6: The "Network Tax" and GPU Starvation
*How network sluggishness acts as a tax on your multi-billion dollar GPU investment.*

*   **📺 Watch (YouTube):** "Training Large Language Models: Distributed Systems Bottlenecks" (Look for Stanford MLSys or CMU engineering talks).
    *   *Focus:* How pipeline parallel bubbles or slow tensor synchronization results in the GPU sitting completely idle (starved) waiting for data over the network.
*   **📖 Read:** DeepSpeed's ZeRO Data Parallelism papers (Microsoft Azure).
    *   *Focus:* How sharding model states alters the sheer volume of communication the backend network must handle.

### Week 7: Optimizing Job Completion Time (JCT)
*JCT is your ultimate North Star metric as a TPM.*

*   **📺 Watch (YouTube):** MLPerf Distributed Training Scaling Results breakdown videos.
    *   *Focus:* Why did specific CSPs train models faster? Analyze their network topology (Fat-tree vs. 3D torus) and collective communication efficiency.
*   **Action Item:** Build a mental "JCT Sensitivity Model." Understand theoretically how a 10% degradation in network tail latency extends JCT and burns compute depreciation dollars.

### Week 8: The Stakeholder Pitch
*Bringing it all together for cross-functional alignment.*

*   **Action Item (Capstone):** Draft a mock 6-pager justifying a hypothetical $100M+ Capex increase in premium networking gear (e.g., non-blocking 800G backend Ethernet) by proving it reduces GPU starvation by 15%, thereby limiting stranded compute and yielding a net-positive ROI relative to cluster size.

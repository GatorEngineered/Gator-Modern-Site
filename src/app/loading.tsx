// app/loading.tsx
export default function AppLoading() {
    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                display: "grid",
                placeItems: "center",
                background: "rgba(0,0,0,.35)",   // subtle veil
                backdropFilter: "blur(4px)",
                zIndex: 9999,
            }}
            aria-live="polite"
            aria-busy="true"
        >
            <div
                style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    border: "3px solid rgba(255,255,255,.25)",
                    borderTopColor: "#3b82f6",
                    animation: "spin 0.9s linear infinite",
                }}
            />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

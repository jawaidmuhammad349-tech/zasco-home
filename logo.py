# Zasco Home monogram: three parallel "threads" folded into a Z (true offset curves, no crossings)
import math

def _offset_z(o, A=(27, 26), B=(73, 26), C=(27, 70), D=(73, 70)):
    def off(p, q):
        dx, dy = q[0]-p[0], q[1]-p[1]; L = math.hypot(dx, dy)
        nx, ny = -dy/L, dx/L
        return (p[0]+nx*o, p[1]+ny*o), (q[0]+nx*o, q[1]+ny*o)
    def inter(l1, l2):
        (x1, y1), (x2, y2) = l1; (x3, y3), (x4, y4) = l2
        den = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4)
        a = x1*y2-y1*x2; b = x3*y4-y3*x4
        return ((a*(x3-x4)-(x1-x2)*b)/den, (a*(y3-y4)-(y1-y2)*b)/den)
    s1, s2, s3 = off(A, B), off(B, C), off(C, D)
    return [s1[0], inter(s1, s2), inter(s2, s3), s3[1]]

def monogram(stroke="#1F3A44", bg="none", frame=True, size=100):
    t, gap = 2.8, 6.2
    parts = []
    if bg != "none":
        parts.append(f'<rect x="0" y="0" width="100" height="100" rx="4" fill="{bg}"/>')
    if frame:
        parts.append(f'<rect x="7" y="7" width="86" height="86" rx="1.5" fill="none" stroke="{stroke}" stroke-width="1.5"/>')
    parts.append('<g transform="translate(50 50) scale(0.8) translate(-50 -48)">')
    for i in (-1, 0, 1):
        pts = _offset_z(i*gap)
        s = " ".join(f"{x:.2f},{y:.2f}" for x, y in pts)
        parts.append(f'<polyline points="{s}" fill="none" stroke="{stroke}" stroke-width="{t}" stroke-linejoin="miter" stroke-miterlimit="12"/>')
    parts.append('</g>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="{size}" height="{size}">'
            + "".join(parts) + '</svg>')

if __name__ == "__main__":
    for name, s, bg in [("monogram-ink", "#1F3A44", "none"),
                        ("monogram-cotton-on-ink", "#F7F2EA", "#1F3A44"),
                        ("monogram-clay", "#A94F33", "none")]:
        open(f"out/{name}.svg", "w").write(monogram(s, bg, size=512))

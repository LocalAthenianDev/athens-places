"""EPSG:2100 (GGRS87 / Greek Grid, ΕΓΣΑ87) to WGS84, without dependencies.

Inverse Transverse Mercator on GRS80 (lon0 = 24°, k0 = 0.9996, FE = 500000),
then the standard 3-parameter shift to WGS84 (towgs84 = -199.87, 74.79, 246.62).
Accuracy is well under a metre, more than enough for web maps.
"""
import math

A = 6378137.0
F = 1 / 298.257222101           # GRS80
E2 = F * (2 - F)
K0, LON0, FE = 0.9996, math.radians(24.0), 500000.0
DX, DY, DZ = -199.87, 74.79, 246.62
A_W, F_W = 6378137.0, 1 / 298.257223563  # WGS84
E2_W = F_W * (2 - F_W)


def _inverse_tm(x, y):
    e2, n = E2, F / (2 - F)
    m = y / K0
    mu = m / (A * (1 - e2 / 4 - 3 * e2 ** 2 / 64 - 5 * e2 ** 3 / 256))
    phi1 = (mu + (3 * n / 2 - 27 * n ** 3 / 32) * math.sin(2 * mu)
            + (21 * n ** 2 / 16 - 55 * n ** 4 / 32) * math.sin(4 * mu)
            + (151 * n ** 3 / 96) * math.sin(6 * mu)
            + (1097 * n ** 4 / 512) * math.sin(8 * mu))
    ep2 = e2 / (1 - e2)
    s, c, t = math.sin(phi1), math.cos(phi1), math.tan(phi1)
    c1, t1 = ep2 * c * c, t * t
    n1 = A / math.sqrt(1 - e2 * s * s)
    r1 = A * (1 - e2) / (1 - e2 * s * s) ** 1.5
    d = (x - FE) / (n1 * K0)
    lat = phi1 - (n1 * t / r1) * (
        d ** 2 / 2 - (5 + 3 * t1 + 10 * c1 - 4 * c1 ** 2 - 9 * ep2) * d ** 4 / 24
        + (61 + 90 * t1 + 298 * c1 + 45 * t1 ** 2 - 252 * ep2 - 3 * c1 ** 2) * d ** 6 / 720)
    lon = LON0 + (d - (1 + 2 * t1 + c1) * d ** 3 / 6
                  + (5 - 2 * c1 + 28 * t1 - 3 * c1 ** 2 + 8 * ep2 + 24 * t1 ** 2) * d ** 5 / 120) / c
    return lat, lon


def _to_ecef(lat, lon, a, e2):
    n = a / math.sqrt(1 - e2 * math.sin(lat) ** 2)
    return (n * math.cos(lat) * math.cos(lon), n * math.cos(lat) * math.sin(lon), n * (1 - e2) * math.sin(lat))


def _from_ecef(x, y, z, a, e2):
    lon = math.atan2(y, x)
    p = math.hypot(x, y)
    lat = math.atan2(z, p * (1 - e2))
    for _ in range(6):
        n = a / math.sqrt(1 - e2 * math.sin(lat) ** 2)
        lat = math.atan2(z + e2 * n * math.sin(lat), p)
    return lat, lon


def to_wgs84(x, y):
    """Greek Grid easting/northing to (lon, lat) in WGS84 degrees."""
    lat, lon = _inverse_tm(x, y)
    X, Y, Z = _to_ecef(lat, lon, A, E2)
    lat, lon = _from_ecef(X + DX, Y + DY, Z + DZ, A_W, E2_W)
    return math.degrees(lon), math.degrees(lat)

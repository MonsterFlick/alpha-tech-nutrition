import os
from PIL import Image

output_dir = os.path.join("public", "images", "labels")
os.makedirs(output_dir, exist_ok=True)

products = [
    {
        "name": "Prime Whey",
        "prefix": "prime-whey",
        "file": r"C:/Users/Admin/Downloads/WHEY PROTEIN.jpg (1).jpeg"
    },
    {
        "name": "Alpha Super Mass Gainer",
        "prefix": "alpha-super-mass-gainer",
        "file": r"C:/Users/Admin/Downloads/ALPHA SUPER MASS GAINER.jpg (1).jpeg"
    },
    {
        "name": "Anabolic Lean Muscle Builder",
        "prefix": "anabolic-lean-muscle-builder",
        "file": r"C:/Users/Admin/Downloads/ANABOLIC LEAN MUSCLE BUILDER.jpg (1).jpeg"
    }
]

# Coordinate bounds on 7264 x 2008 master
# Left border of label: 191
# Right border of label: 7073
# Left white panel: 191 to 2316
# Center front panel: 2316 to 4948
# Right white panel: 4948 to 7073
# Price & Date erase box: x: 390 to 880, y: 1605 to 1830

for p in products:
    print(f"Processing Ultra-HD Master for {p['name']}...")
    im = Image.open(p["file"]).convert("RGB")
    w, h = im.size
    print(f"  Master dimensions: {w} x {h}")
    
    # 1. Cleanly hide Price & Date (Mfg Date, MRP, Unit price lines)
    # Background color of the nutrition box is (254, 254, 254)
    im_clean = im.copy()
    bg_color = (254, 254, 254)
    for x in range(390, 880):
        for y in range(1605, 1830):
            im_clean.putpixel((x, y), bg_color)
            
    # 2. Extract Ultra-HD Crops
    full_label = im_clean.crop((191, 0, 7073, h))
    panel_nutrition = im_clean.crop((191, 0, 2316, h))
    panel_front = im_clean.crop((2316, 0, 4948, h))
    panel_back = im_clean.crop((4948, 0, 7073, h))
    
    # 3. Save as high-quality PNGs with optimize=True
    full_path = os.path.join(output_dir, f"{p['prefix']}-full-label.png")
    nut_path = os.path.join(output_dir, f"{p['prefix']}-nutrition.png")
    front_path = os.path.join(output_dir, f"{p['prefix']}-front.png")
    back_path = os.path.join(output_dir, f"{p['prefix']}-back.png")
    
    full_label.save(full_path, optimize=True)
    panel_nutrition.save(nut_path, optimize=True)
    panel_front.save(front_path, optimize=True)
    panel_back.save(back_path, optimize=True)
    
    print(f"  Saved Full Label: {full_path} ({full_label.size[0]}x{full_label.size[1]}, {os.path.getsize(full_path)/1024:.1f} KB)")
    print(f"  Saved Nutrition:  {nut_path} ({panel_nutrition.size[0]}x{panel_nutrition.size[1]}, {os.path.getsize(nut_path)/1024:.1f} KB)")
    print(f"  Saved Front:      {front_path} ({panel_front.size[0]}x{panel_front.size[1]}, {os.path.getsize(front_path)/1024:.1f} KB)")
    print(f"  Saved Back:       {back_path} ({panel_back.size[0]}x{panel_back.size[1]}, {os.path.getsize(back_path)/1024:.1f} KB)")

print("\nAll Ultra-HD master label crops completed successfully!")


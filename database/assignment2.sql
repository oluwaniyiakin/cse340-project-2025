-- 1. Insert Tony Stark Record 
INSERT INTO public.account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2. Modify Tony Stark’s Account Type
UPDATE public.account 
SET account_type = 'Admin' 
WHERE account_email = 'tony@starkent.com';

-- 3. Delete Tony Stark’s Account
DELETE FROM public.account 
WHERE account_email = 'tony@starkent.com';

-- 4. Modify the "GM Hummer" Description
UPDATE public.inventory 
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior') 
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- 5. Select Inventory Data with Classification Name (JOIN)
SELECT inv.inv_make, inv.inv_model, class.classification_name 
FROM public.inventory inv
INNER JOIN public.classification class 
ON inv.classification_id = class.classification_id 
WHERE class.classification_name = 'Sport';

-- 6. Update Image Paths in Inventory Table
UPDATE public.inventory 
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');

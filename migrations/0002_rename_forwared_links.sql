-- Migration number: 0002	2025-02-08
-- Rename the existing redirect log table to fix the typo.
-- Existing data is preserved.

ALTER TABLE forwared_links RENAME TO forwarded_links;


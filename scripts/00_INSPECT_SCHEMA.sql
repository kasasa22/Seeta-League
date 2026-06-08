SELECT category, object_name, ordinal, detail
FROM (
  SELECT '1_column'::text AS category,
         table_name::text AS object_name,
         ordinal_position::int AS ordinal,
         (column_name || '  ::  ' || data_type
          || '  | nullable=' || is_nullable
          || '  | default=' || COALESCE(column_default, '-')) AS detail
  FROM information_schema.columns
  WHERE table_schema = 'public'

  UNION ALL
  SELECT '2_constraint',
         conrelid::regclass::text,
         0,
         conname || '  ::  ' || pg_get_constraintdef(oid)
  FROM pg_constraint
  WHERE connamespace = 'public'::regnamespace

  UNION ALL
  SELECT '3_index',
         tablename,
         0,
         indexname || '  ::  ' || indexdef
  FROM pg_indexes
  WHERE schemaname = 'public'

  UNION ALL
  SELECT '4_trigger',
         tgrelid::regclass::text,
         0,
         pg_get_triggerdef(oid)
  FROM pg_trigger
  WHERE NOT tgisinternal
    AND tgrelid IN (SELECT oid FROM pg_class WHERE relnamespace = 'public'::regnamespace)

  UNION ALL
  SELECT '5_function',
         proname,
         0,
         pg_get_functiondef(oid)
  FROM pg_proc
  WHERE pronamespace = 'public'::regnamespace

  UNION ALL
  SELECT '6_view',
         viewname,
         0,
         pg_get_viewdef((schemaname || '.' || viewname)::regclass, true)
  FROM pg_views
  WHERE schemaname = 'public'
) x
ORDER BY category, object_name, ordinal;
